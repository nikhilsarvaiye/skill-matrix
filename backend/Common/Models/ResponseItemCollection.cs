namespace Common.Models
{
    using Abstractions;
    using System.Collections.ObjectModel;

    public class ResponseItemCollection<T> : Collection<T>, IResponse<T>
    {
    }
}
