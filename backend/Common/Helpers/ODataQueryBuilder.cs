namespace Common.Helpers
{
    using Abstractions;
    using Microsoft.AspNet.OData.Builder;
    using Microsoft.AspNet.OData.Query;
    using Microsoft.AspNetCore.Http;
    using Microsoft.OData.Edm;
    using Microsoft.OData.UriParser;
    using Models;
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public static class ODataQueryBuilder
    {
        public static IRequest ToPaginationCriteria<T>(this HttpRequest httpRequest)
            where T : class, new()
        {
            var requestUri = new Uri($"{nameof(T)}/{httpRequest.QueryString.Value}", UriKind.Relative);
            var parser = new ODataUriParser(GetEdmModel<T>(nameof(T)), requestUri)
            {
                Resolver = new ODataUriResolver()
                {
                    EnableCaseInsensitive = true
                }
            };
            var selectExpandClause = parser.ParseSelectAndExpand();
            var filterClause = parser.ParseFilter();
            var orderby = parser.ParseOrderBy();
            bool? count = parser.ParseCount();
            long? top = parser.ParseTop();
            long? skip = parser.ParseSkip();

            var request = new Request();
            if (count.HasValue)
            {
                request.Count = Convert.ToBoolean(count.Value);
            }
            if (skip.HasValue)
            {
                request.Page = Convert.ToInt32(skip.Value) + 1;
            }
            if (top.HasValue)
            {
                request.PageSize = Convert.ToInt32(top.Value);
            }
            request.Filters = filterClause.ToFilters();
            request.Select = selectExpandClause.ToSelect();
            request.Sorts = orderby.ToSorts();
            return request;
        }

        private static List<IFilter> ToFilters(this FilterClause filterClause)
        {
            // Parsing a filter, e.g. /Products?$filter=Name eq 'beer' 
            if (filterClause == null)
            {
                return null;
            }

            return new List<IFilter>().ToFilters(filterClause.Expression);
        }

        private static List<IFilter> ToFilters(this List<IFilter> filters, QueryNode queryNode)
        {
            filters = filters ?? new List<IFilter>();


            switch (queryNode.GetType().Name)
            {
                case nameof(BinaryOperatorNode):
                    {
                        var binaryOperator = queryNode as BinaryOperatorNode;
                        
                        var property = binaryOperator.Left.GetProperty();
                        if (property == null)
                        {
                            filters = filters.ToFilters(binaryOperator.Left);
                        }

                        var value = binaryOperator.Right.GetValue();
                        if (value == null)
                        {
                            filters = filters.ToFilters(binaryOperator.Right);
                        }

                        if (binaryOperator.OperatorKind.IsLogicalOperator() && filters.Count >= 2)
                        {
                            filters = filters.ClubFilters(binaryOperator.OperatorKind);
                        }
                        
                        if (property != null && value != null)
                        {
                            filters.Add(new Filter()
                            {
                                Operator = binaryOperator.OperatorKind.ToFilterOperator(),
                                Property = property,
                                Value = value
                            });
                        }
                    };
                    break;
                case nameof(SingleValueFunctionCallNode):
                    {
                        var singleValueFunctionCallNode = (queryNode as SingleValueFunctionCallNode);
                        var parameters = singleValueFunctionCallNode.Parameters.ToList();

                        var property = parameters.FirstOrDefault().GetProperty();
                        var value = parameters.LastOrDefault().GetValue();
                        filters.Add(new Filter()
                        {
                            Operator = singleValueFunctionCallNode.Name.ToFilterOperator(),
                            Property = property,
                            Value = value
                        });

                    }; break;
            }

            return filters;
        }

        private static string GetProperty(this QueryNode queryNode)
        {
            switch (queryNode.GetType().Name)
            {
                case nameof(BinaryOperatorNode):
                    {
                        var binaryOperator = queryNode as BinaryOperatorNode;

                        return binaryOperator.Left.GetProperty();
                    };
                case nameof(ConvertNode): return (queryNode as ConvertNode).Source.GetProperty();
                case nameof(SingleValuePropertyAccessNode): return (queryNode as SingleValuePropertyAccessNode).Property.Name;
                case nameof(ConstantNode): return (queryNode as ConstantNode).GetProperty();
            }

            return null;
        }

        private static object GetValue(this QueryNode queryNode)
        {
            switch (queryNode.GetType().Name)
            {
                case nameof(BinaryOperatorNode):
                    {
                        var binaryOperator = queryNode as BinaryOperatorNode;

                        return binaryOperator.Right.GetValue();
                    };
                case nameof(ConvertNode): return (queryNode as ConvertNode).Source.GetValue();
                case nameof(SingleValuePropertyAccessNode): return (queryNode as SingleValuePropertyAccessNode).GetValue();
                case nameof(ConstantNode): return (queryNode as ConstantNode).Value;
            }

            return null;
        }

        private static List<IFilter> ClubFilters(this List<IFilter> filters, BinaryOperatorKind binaryOperatorKind)
        {
            if (filters.Count <= 1)
            {
                return filters;
            }
            
            var clubFilters = new List<IFilter>();
            
            foreach (var range in Enumerable.Range(0, filters.Count - 2).Select(x => x))
            {
                clubFilters.Add(filters[range]);
            }

            clubFilters.Add(new CompositeFilter()
            {
                LogicalOperator = binaryOperatorKind.ToLogicalOperator(),
                Filters = new List<IFilter>()
                                    {
                                        filters[filters.Count - 2],
                                        filters.LastOrDefault()
                                    }
            });
            return clubFilters;
        }

        private static List<string> ToSelect(this SelectExpandClause selectExpandClause)
        {
            // Parsing a select list , e.g. /Products?$select=Price,Name
            if (selectExpandClause == null)
            {
                return null;
            }

            var select = new List<string>();

            foreach (var item in selectExpandClause.SelectedItems)
            {
                var selectItem = item as PathSelectItem;
                if (selectItem != null && selectItem.SelectedPath != null)
                {
                    var segment = selectItem.SelectedPath.FirstSegment as PropertySegment;
                    if (segment != null)
                    {
                        Console.WriteLine("Property: " + segment.Property.Name);
                        select.Add(segment.Property.Name);
                    }
                }
            }

            return select;
        }

        private static List<Sort> ToSorts(this OrderByClause orderByClause)
        {
            // Parsing a select list , e.g. /Products?$select=Price,Name
            if (orderByClause == null)
            {
                return null;
            }

            var sorts = new List<Sort>();

            var node = orderByClause.Expression as SingleValuePropertyAccessNode;

            sorts.Add(new Sort()
            {
                Direction = orderByClause.Direction == OrderByDirection.Ascending ? SortDirection.Ascending : SortDirection.Descending,
                Property = node.Property.Name
            });

            return sorts;
        }

        private static bool IsLogicalOperator(this BinaryOperatorKind binaryOperatorKind)
        {
            switch (binaryOperatorKind)
            {
                case BinaryOperatorKind.And: return true;
                case BinaryOperatorKind.Or: return true;
            }

            return false;
        }

        private static LogicalOperator ToLogicalOperator(this BinaryOperatorKind binaryOperatorKind)
        {
            switch (binaryOperatorKind)
            {
                case BinaryOperatorKind.And: return LogicalOperator.And;
                case BinaryOperatorKind.Or: return LogicalOperator.Or;
            }

            throw new NotImplementedException(nameof(binaryOperatorKind));
        }

        private static FilterOperator ToFilterOperator(this BinaryOperatorKind binaryOperatorKind)
        {
            switch (binaryOperatorKind)
            {
                case BinaryOperatorKind.Equal: return FilterOperator.IsEqualTo;
                case BinaryOperatorKind.NotEqual: return FilterOperator.IsNotEqualTo;
                case BinaryOperatorKind.GreaterThan: return FilterOperator.IsGreaterThan;
                case BinaryOperatorKind.GreaterThanOrEqual: return FilterOperator.IsGreaterThanOrEqualTo;
                case BinaryOperatorKind.LessThan: return FilterOperator.IsLessThan;
                case BinaryOperatorKind.LessThanOrEqual: return FilterOperator.IsLessThanOrEqualTo;
                case BinaryOperatorKind.Has: return FilterOperator.Contains;
            }

            throw new NotImplementedException(nameof(binaryOperatorKind));
        }

        private static FilterOperator ToFilterOperator(this string operatorName)
        {
            switch (operatorName.ToLowerInvariant())
            {
                case "startswith": return FilterOperator.StartsWith;
                case "contains": return FilterOperator.Contains;
            }

            throw new NotImplementedException(nameof(operatorName));
        }

        private static IEdmModel GetEdmModel<T>(string entityName)
            where T : class, new()
        {
            var odataBuilder = new ODataConventionModelBuilder();
            odataBuilder.EntitySet<T>(entityName);

            return odataBuilder.GetEdmModel();
        }
    }
}
