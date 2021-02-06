namespace Repositories.Abstractions
{
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
    }
}
