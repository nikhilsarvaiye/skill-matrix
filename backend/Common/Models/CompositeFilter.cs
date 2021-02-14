﻿namespace Common.Models
{
    using Abstractions;
    using System.Collections.Generic;
    
    public class CompositeFilter : IFilter
    {
        public LogicalOperator LogicalOperator { get; set; }
        
        public List<IFilter> Filters { get; set; }
    }
}
