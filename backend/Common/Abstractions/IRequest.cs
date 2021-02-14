namespace Common.Abstractions
{
    using Models;
    using System.Collections.Generic;
    
    public interface IRequest
    {
        int Page { get; set; }

        int? PageSize { get; set; }

        bool Count { get; set; }

        List<IFilter> Filters { get; set; }

        List<Sort> Sorts { get; set; }

        List<string> Select { get; set; }
    }
}
