namespace Repositories.Helpers
{
    using Common.Abstractions;
    using Common.Models;
    using Models;
    using MongoDB.Bson;
    using MongoDB.Driver;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public static class MongoDbQueryHelper
    {
        public static IFindFluent<T, T> Query<T>(this IMongoCollection<T> collection, IRequest request)
            where T : BaseModel
        {
            if (request == null)
            {
                return collection.Find(_ => true);
            }

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
            if (request.Filter != null)
            {
                var filterDefinition = GetFilterDefinitions<T>(null, new List<IFilter> { request.Filter });
                return filterDefinition;
            }
            return Builders<T>.Filter.Empty;
        }

        private static FilterDefinition<T> GetFilterDefinitions<T>(this FilterDefinition<T> filterDefinition, List<IFilter> filters, LogicalOperator logicalOperator = LogicalOperator.And)
            where T : BaseModel
        {
            if (filters == null)
            {
                return null;
            }

            var filterDefinitions = new List<FilterDefinition<T>>();
            foreach (var filterItem in filters)
            {
                switch (filterItem)
                {
                    case CompositeFilter _:

                        var compositeFilter = filterItem as CompositeFilter;

                        filterDefinition = GetFilterDefinitions(filterDefinition,
                                                                    compositeFilter?.Filters,
                                                                    compositeFilter.LogicalOperator);
                        filterDefinitions.Add(filterDefinition);
                        break;

                    case Filter _:

                        var filter = filterItem as Filter;
                        filterDefinitions.Add(filter.GetFilterExpression<T>());
                        break;
                }
            }

            if (filterDefinitions.Count == 1)
            {
                if(logicalOperator == LogicalOperator.Not)
                {
                    return logicalOperator.GetFilterExpression<T>(filterDefinitions);

                }
                return filterDefinitions.FirstOrDefault();
            }
            else if (filterDefinitions.Count == 2)
            {
                return logicalOperator.GetFilterExpression<T>(filterDefinitions);
            }

            return filterDefinition;
        }

        private static List<FilterDefinition<T>> ClubFilters<T>(this List<FilterDefinition<T>> filterDefinitions, LogicalOperator logicalOperator)
            where T : BaseModel
        {
            if (filterDefinitions.Count <= 1)
            {
                return filterDefinitions;
            }

            var clubFilters = new List<FilterDefinition<T>>();

            foreach (var range in Enumerable.Range(0, filterDefinitions.Count - 2).Select(x => x))
            {
                clubFilters.Add(filterDefinitions[range]);
            }

            clubFilters.Add(logicalOperator.GetFilterExpression<T>(filterDefinitions));
            return clubFilters;
        }

        private static FilterDefinition<T> GetFilterExpression<T>(this LogicalOperator logicalOperator, IEnumerable<FilterDefinition<T>> filters)
            where T : BaseModel
        {
            switch (logicalOperator)
            {
                case LogicalOperator.And:
                    return Builders<T>.Filter.And(filters);
                case LogicalOperator.Or:
                    return Builders<T>.Filter.Or(filters);
                case LogicalOperator.Not:
                    return Builders<T>.Filter.Not(filters.FirstOrDefault());
                default:
                    throw new NotImplementedException(nameof(logicalOperator));
            }
        }

        private static FilterDefinition<T> GetFilterExpression<T>(this Filter filter)
            where T : BaseModel
        {
            var filterColumn = $"{filter.Property}";
            var filterValue = GetFilterValue<T>(filter.Value);

            switch (filter.Operator)
            {
                case FilterOperator.IsEqualTo:
                    return Builders<T>.Filter.Eq(filterColumn, filterValue);
                case FilterOperator.IsNotEqualTo:
                    return Builders<T>.Filter.Not(Builders<T>.Filter.Eq(filterColumn, filterValue));
                case FilterOperator.IsGreaterThan:
                    return Builders<T>.Filter.Gt(filterColumn, filterValue);
                case FilterOperator.IsGreaterThanOrEqualTo:
                    return Builders<T>.Filter.Gte(filterColumn, filterValue);
                case FilterOperator.IsLessThan:
                    return Builders<T>.Filter.Lt(filterColumn, filterValue);
                case FilterOperator.IsLessThanOrEqualTo:
                    return Builders<T>.Filter.Lte(filterColumn, filterValue);
                case FilterOperator.Contains:
                    return Builders<T>.Filter.Regex(filterColumn, new BsonRegularExpression($"{filterValue}", "i"));
                case FilterOperator.StartsWith:
                    return Builders<T>.Filter.Regex(filterColumn, new BsonRegularExpression($"^{filterValue}", "i"));
                case FilterOperator.EndsWith:
                    return Builders<T>.Filter.Regex(filterColumn, new BsonRegularExpression($"{filterValue}$", "i"));
                case FilterOperator.IsNull:
                    return Builders<T>.Filter.Exists(filterColumn, false);
                case FilterOperator.IsContainedIn:
                    return Builders<T>.Filter.In(filterColumn, filterValue as List<object>);
                case FilterOperator.DoesNotContain:
                    return Builders<T>.Filter.Regex(filterColumn, new BsonRegularExpression($"^((?!{filterValue}).)*$", "i"));
                case FilterOperator.IsNotNull:
                    return Builders<T>.Filter.Exists(filterColumn);
                case FilterOperator.IsEmpty:
                    return Builders<T>.Filter.Eq(filterColumn, string.Empty);
                case FilterOperator.IsNotEmpty:
                    return Builders<T>.Filter.Not(Builders<T>.Filter.Eq(filterColumn, string.Empty));
                default:
                    throw new NotImplementedException(nameof(filter.Operator));
            }
        }

        private static object GetFilterValue<T>(object value)
        {
            // [NS] TODO: Need to write for other types like date
            // ObjectId? objectId = null;
            if (value is bool)
            {
                return Convert.ToBoolean(value) ? true : false;
            }
            else if (ObjectId.TryParse(Convert.ToString(value), out ObjectId objectId) && objectId != null)
            {
                return objectId;
            }

            return value;
        }
    }
}
