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
            // Examples OData
            // https://localhost:5001/skill?$select=Id&$filter=Id eq '01'&$orderby=Id desc&$top=1&$count=true&$search=tom

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
            request.Filter = filterClause.ToFilter();
            request.Select = selectExpandClause.ToSelect();
            request.Sorts = orderby.ToSorts();
            return request;
        }

        private static IFilter ToFilter(this FilterClause filterClause)
        {
            // Parsing a filter, e.g. /Products?$filter=Name eq 'beer' 
            if (filterClause == null)
            {
                return null;
            }

            return new List<IFilter>().ToFilters(filterClause.Expression).FirstOrDefault();
        }

        private static List<IFilter> ToFilters(this List<IFilter> filters, QueryNode queryNode)
        {
            filters = filters ?? new List<IFilter>();

            switch (queryNode.GetType().Name)
            {
                // case nameof(SingleValuePropertyAccessNode): return filters.ToFilters(queryNode as SingleValuePropertyAccessNode);
                // case nameof(ConstantNode): return filters.ToFilters(queryNode as ConstantNode);
                case nameof(ConvertNode): return filters.ToFilters((queryNode as ConvertNode).Source);
                case nameof(UnaryOperatorNode):
                    {
                        var unaryOperator = queryNode as UnaryOperatorNode;
                        var filterItems = filters.ToFilters(unaryOperator.Operand);
                        if (filters.Count >= 1)
                        {
                            filters = filters.WrapUnaryFilters(unaryOperator.OperatorKind.ToLogicalOperator());
                        }
                    }; break;
                case nameof(BinaryOperatorNode):
                    {
                        var binaryOperator = queryNode as BinaryOperatorNode;

                        var binaryFilters = new List<IFilter>();
                        var leftFilters = new List<IFilter>().ToFilters(binaryOperator.Left);
                        var rightFilters = new List<IFilter>().ToFilters(binaryOperator.Right);

                        binaryFilters.AddRange(leftFilters);
                        binaryFilters.AddRange(rightFilters);

                        if (binaryOperator.OperatorKind.IsLogicalOperator() && binaryFilters.Count >= 2)
                        {
                            filters = binaryFilters.ClubFilters(binaryOperator.OperatorKind.ToLogicalOperator());
                        }

                        var property = binaryOperator.Left.GetProperty();
                        var value = binaryOperator.Right.GetValue();
                        if (property != null && binaryOperator.OperatorKind.IsFilterOperator())
                        {
                            filters.Add(new Filter()
                            {
                                Operator = binaryOperator.OperatorKind.ToFilterOperator(),
                                Property = property,
                                Value = value
                            });
                        }

                        if (binaryOperator.OperatorKind.IsLogicalOperator() && filters.Count >= 2)
                        {
                            filters = filters.ClubFilters(binaryOperator.OperatorKind.ToLogicalOperator());
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
                case nameof(InNode):
                    {
                        var inNode = queryNode as InNode;

                        var property = inNode.Left.GetProperty();
                        var value = inNode.Right.GetValue();
                        if (property != null)
                        {
                            filters.Add(new Filter()
                            {
                                Operator = inNode.Kind.ToFilterOperator(),
                                Property = property,
                                Value = value
                            });
                        }
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
                case nameof(CollectionConstantNode):
                    {
                        var collection = (queryNode as CollectionConstantNode).Collection;
                        var values = collection.Select(x => x.GetValue()).ToList();
                        return values;
                    };
            }

            return null;
        }

        private static List<IFilter> ClubFilters(this List<IFilter> filters, LogicalOperator logicalOperator)
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
                LogicalOperator = logicalOperator,
                Filters = new List<IFilter>()
                                    {
                                        filters[filters.Count - 2],
                                        filters.LastOrDefault()
                                    }
            });
            return clubFilters;
        }

        private static List<IFilter> WrapUnaryFilters(this List<IFilter> filters, LogicalOperator logicalOperator)
        {
            if (filters.Count == 0)
            {
                return filters;
            }

            var unaryFilters = new List<IFilter>();

            unaryFilters.Add(new CompositeFilter()
            {
                LogicalOperator = logicalOperator,
                Filters = new List<IFilter>()
                                    {
                                        filters.FirstOrDefault()
                                    }
            });
            return unaryFilters;
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

        private static LogicalOperator ToLogicalOperator(this UnaryOperatorKind unaryOperatorKind)
        {
            switch (unaryOperatorKind)
            {
                case UnaryOperatorKind.Not: return LogicalOperator.Not;
            }

            throw new NotImplementedException(nameof(unaryOperatorKind));
        }

        private static bool IsFilterOperator(this BinaryOperatorKind binaryOperatorKind)
        {
            switch (binaryOperatorKind)
            {
                case BinaryOperatorKind.And: return false;
                case BinaryOperatorKind.Or: return false;
                case BinaryOperatorKind.Add: return false;
                case BinaryOperatorKind.Subtract: return false;
                case BinaryOperatorKind.Multiply: return false;
                case BinaryOperatorKind.Divide: return false;
            }

            return true;
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

        private static FilterOperator ToFilterOperator(this QueryNodeKind queryNodeKind)
        {
            switch (queryNodeKind)
            {
                case QueryNodeKind.In: return FilterOperator.IsContainedIn;
            }

            throw new NotImplementedException(nameof(queryNodeKind));
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
