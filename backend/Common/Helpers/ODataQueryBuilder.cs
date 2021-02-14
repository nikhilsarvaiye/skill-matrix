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

            var filters = new List<IFilter>();

            var binaryOperator = filterClause.Expression as BinaryOperatorNode;
            if (binaryOperator != null)
            {
                var property = (binaryOperator.Left as ConvertNode).Source as SingleValuePropertyAccessNode;

                //  ?? binaryOperator.Right as SingleValuePropertyAccessNode
                var constant = binaryOperator.Right as ConstantNode ?? binaryOperator.Right as ConstantNode;

                if (property != null && property.Property != null && constant != null && constant.Value != null)
                {
                    Console.WriteLine("Property: " + property.Property.Name);
                    Console.WriteLine("Operator: " + binaryOperator.OperatorKind);
                    Console.WriteLine("Value: " + constant.LiteralText);
                    filters.Add(new Filter()
                    {
                        Operator = binaryOperator.OperatorKind.ToFilterOperator(),
                        Property = property.Property.Name,
                        PropertyType = typeof(SingleValuePropertyAccessNode),
                        Value = constant.Value
                    });
                }
            }

            var inOperator = filterClause.Expression as InNode;
            if (inOperator != null)
            {
                var property = inOperator.Left as SingleValueNode;
                var constant = inOperator.Right as CollectionNode;

                Console.WriteLine("Property: " + inOperator.Left.ToString());
                Console.WriteLine("Operator: " + inOperator.Kind);
                Console.WriteLine("Value: " + inOperator.Right.ToString());
            }

            return filters;
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

        private static IEdmModel GetEdmModel<T>(string entityName)
            where T : class, new()
        {
            var odataBuilder = new ODataConventionModelBuilder();
            odataBuilder.EntitySet<T>(entityName);

            return odataBuilder.GetEdmModel();
        }
    }
}
