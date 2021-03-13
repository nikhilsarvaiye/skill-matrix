namespace Services.Abstractions
{
    using DotnetStandardQueryBuilder.Core;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IService<T>
    {
        Task<List<T>> GetAsync(IRequest request = null);

        Task<T> GetAsync(string id);

        Task<T> GetOrThrowAsync(string id);

        Task<List<T>> GetAsync(List<string> ids);

        Task<T> CreateAsync(T t);

        Task UpdateAsync(string id, T t);

        Task RemoveAsync(T t);

        Task RemoveAsync(string id);

        Task<IResponse<T>> PaginateAsync(IRequest request);
    }
}
