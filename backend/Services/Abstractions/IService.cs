namespace Services.Abstractions
{
    using Common.Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IService<T>
    {
        Task<List<T>> GetAsync();

        Task<T> GetAsync(string id);

        Task<T> CreateAsync(T t);

        Task UpdateAsync(string id, T t);

        Task RemoveAsync(T t);

        Task RemoveAsync(string id);

        Task<PaginationResponse<T>> FilterAsync(PaginationCriteria<T> paginationCriteria);
    }
}
