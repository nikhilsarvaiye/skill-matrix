namespace Common.Models
{
    public class PageResponse
    {
        public long TotalCount { get; set; }

        public bool Create { get; set; }

        public bool Update { get; set; }

        public bool Delete { get; set; }
    }
}
