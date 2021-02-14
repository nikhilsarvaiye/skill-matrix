namespace Repositories.Helpers
{
    using Common.Abstractions;
    using Models;
    using MongoDB.Driver;

    public static class MongoDbQueryHelper
    {
        public static IFindFluent<T, T> Query<T>(this IMongoCollection<T> collection, IRequest request)
            where T : BaseModel
        {
            var filter = request.ToFilterDefinition<T>();

            return collection.Find(filter).Paginate(request).Sort(request).Project(request);
        }

        public static IFindFluent<T, T> QueryCount<T>(this IMongoCollection<T> collection, IRequest request)
            where T : BaseModel
        {
            var filter = request.ToFilterDefinition<T>();

            return collection.Find(filter).Sort(request).Project(request);
        }

        public static IFindFluent<T, T> Sort<T>(this IFindFluent<T, T> query, IRequest request)
            where T : BaseModel
        {
            if (request.Sorts != null)
            {
                foreach (var sort in request.Sorts)
                {
                    query = query.Sort(sort.Direction == Common.Models.SortDirection.Ascending
                        ? Builders<T>.Sort.Ascending(sort.Property)
                        : Builders<T>.Sort.Descending(sort.Property));
                }
            }

            return query;
        }

        public static IFindFluent<T, T> Project<T>(this IFindFluent<T, T> query, IRequest request)
            where T : BaseModel
        {
            if (request.Select != null)
            {
                foreach (var select in request.Select)
                {
                    query = query.Project<T>(Builders<T>.Projection.Include(select));
                }
            }

            return query;
        }

        public static IFindFluent<T, T> Paginate<T>(this IFindFluent<T, T> query, IRequest request)
            where T : BaseModel
        {
            if (request.PageSize.HasValue)
            {
                query = query.Skip((request.Page - 1) * request.PageSize).Limit(request.PageSize);
            }

            return query;
        }

        private static FilterDefinition<T> ToFilterDefinition<T>(this IRequest request)
            where T : BaseModel
        {
            // return Builders<T>.Filter.Eq("", "1");
            
            return Builders<T>.Filter.Empty;
        }

        /*
        private static FilterDefinition<T> GetFilterDefinition<T>(this FilterDefinition<T> filterDefinition, List<IFilter> filters, LogicalOperator logicalOperator = LogicalOperator.And, int filterCount = 0)
            where T : BaseModel
        {
            if (filters == null)
            {
                return filterDefinition;
            }

            foreach (var filterItem in filters)
            {
                switch (filterItem)
                {
                    case CompositeFilter _:

                        var compositeFilter = filterItem as CompositeFilter;
                        filterDefinition = GetFilterDefinition(filterDefinition,
                                                                    compositeFilter?.Filters,
                                                                    compositeFilter.LogicalOperator,
                                                                    filterCount);
                        break;

                    case Filter _:

                        var filter = filterItem as Filter;
                        filterCount++;
                        if ((!string.IsNullOrEmpty(logicalOperator) && filterDefinition.Contains(logicalOperator)) || (filterCount == 2))
                        {
                            filterDefinition = $"{filterDefinition} {logicalOperator} ";
                        }

                        filterDefinition = $"{filterDefinition}{filter.GetFilterExpression()}";
                        break;
                }
            }

            return filterDefinition;
        }

        private static FilterDefinition<T> GetFilterExpression<T>(this FilterDefinition<T> filterDefinition, Filter filter)
            where T : BaseModel
        {
            // [NS] TODO: Need to write for other operator like IN
            FilterDefinition<T> filterDefinition;
            var filterColumn = $"{filter.Property}";
            var filterValue = GetFilterValue(filter.Value);

            switch (filter.Operator)
            {
                case FilterOperator.IsEqualTo:
                    filterDefinition = filterDefinition;
                    break;
                case FilterOperator.IsNotEqualTo:
                    filterDefinition = $"{filterColumn}!={filterValue}";
                    break;
                case FilterOperator.IsGreaterThan:
                    filterDefinition = $"{filterColumn}>{filterValue}";
                    break;
                case FilterOperator.IsGreaterThanOrEqualTo:
                    filterDefinition = $"{filterColumn}>{filterValue}";
                    break;
                case FilterOperator.IsLessThan:
                    filterDefinition = $"{filterColumn}<{filterValue}";
                    break;
                case FilterOperator.IsLessThanOrEqualTo:
                    filterDefinition = $"{filterColumn}<={filterValue}";
                    break;
                case FilterOperator.Contains:
                    filterDefinition = $"CONTAINS(LOWER({filterColumn}),LOWER({filterValue}))";
                    break;
                case FilterOperator.StartsWith:
                    filterDefinition = $"STARTSWITH(LOWER({filterColumn}),LOWER({filterValue}))";
                    break;
                case FilterOperator.EndsWith:
                    filterDefinition = $"ENDSWITH(LOWER({filterColumn}),LOWER({filterValue}))";
                    break;
                case FilterOperator.IsNull:
                    filterDefinition = $"IS_NULL({filterColumn})";
                    break;
                case FilterOperator.IsContainedIn:
                    throw new NotImplementedException(nameof(filter.Operator));
                case FilterOperator.DoesNotContain:
                    throw new NotImplementedException(nameof(filter.Operator));
                case FilterOperator.IsNotNull:
                    throw new NotImplementedException(nameof(filter.Operator));
                case FilterOperator.IsEmpty:
                    throw new NotImplementedException(nameof(filter.Operator));
                case FilterOperator.IsNotEmpty:
                    throw new NotImplementedException(nameof(filter.Operator));
                default:
                    throw new NotImplementedException(nameof(filter.Operator));
            }

            return filterDefinition;
        }

        private static object GetFilterValue(object value)
        {
            // [NS] TODO: Need to write for other types like date
            if (value is bool)
            {
                return Convert.ToBoolean(value) ? 1 : 0;
            }

            return value is string ? $"'{value}'" : value;
        }
        */
    }
}
