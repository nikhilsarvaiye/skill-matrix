namespace Common.Models
{
    using Abstractions;
    
    public class Response<T> : IResponse<T>
    {
        public long Count { get; set; }

        public ResponseItemCollection<T> Items { get; set; }
    }
}
