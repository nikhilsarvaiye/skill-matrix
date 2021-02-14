namespace Repositories.Abstractions
{
    using Common.Abstractions;
    using Common.Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IRepository<T>
    {
        Task<List<T>> GetAsync();

        Task<T> GetAsync(string id);

        Task<T> CreateAsync(T t);

        Task UpdateAsync(string id, T t);

        Task RemoveAsync(T t);

        Task RemoveAsync(string id);

        Task<IResponse<T>> PaginateAsync(IRequest request);
    }
}
