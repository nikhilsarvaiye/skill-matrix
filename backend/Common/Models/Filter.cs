namespace Common.Models
{
    using Abstractions;
    using System;

    public class Filter : IFilter
    {
        public string Property { get; set; }
        
        public FilterOperator Operator { get; set; }
        
        public object Value { get; set; }
    }
}
