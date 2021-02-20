namespace Common.Abstractions
{
    using System.Collections.Generic;

    public interface IResponse<T>
    {
        public long Count { get; set; }

        public List<T> Items { get; set; }
    }
}
