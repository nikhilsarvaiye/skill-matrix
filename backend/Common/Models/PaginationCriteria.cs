namespace Common.Models
{
    using MongoDB.Driver;
    using System;
    using System.Collections.Generic;

    public class PaginationCriteria<T>
    {
        public Guid? CacheId { get; set; }

        public int Page { get; set; } = 1;

        public int PageSize { get; set; } = 200;

        public List<string> Select { get; set; }

        public string SortField { get; set; }

        public string SortOrder { get; set; }

        public string Operator { get; set; }

        public FilterDefinition<T> Filter { get; set; }

        public bool HasSorting()
        {
            return !string.IsNullOrEmpty(this.SortField) && !string.IsNullOrEmpty(this.SortOrder);
        }

        public class SortOrderTyoe
        {
            public const string Ascending = "ascend";

            public const string Descending = "descend";
        }
    }
}
