namespace Common.Models
{
    using System.Collections.Generic;

    public class PaginationResponse<T>
    {
        public long Count { get; set; }

        public IEnumerable<T> Items { get; set; }
    }
}
