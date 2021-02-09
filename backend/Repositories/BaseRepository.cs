namespace Repositories
{
    using Common.Models;
    using Configuration.Options.Abstractions;
    using Models;
    using MongoDB.Driver;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class BaseRepository<T>
        where T : BaseModel
    {
        private readonly IMongoCollection<T> _collection;

        public BaseRepository(IDbOptions dbOptions, string collectionName)
        {
            var client = new MongoClient(dbOptions.ConnectionString);
            var database = client.GetDatabase(dbOptions.DatabaseName);

            _collection = database.GetCollection<T>(collectionName);
        }

        public async Task<List<T>> GetAsync() => (await _collection.FindAsync(book => true)).ToList();

        public async Task<T> GetAsync(string id) => (await _collection.FindAsync<T>(book => book.Id == id)).FirstOrDefault();

        public async Task<PaginationResponse<T>> PaginateAsync(PaginationCriteria<T> paginationCriteria)
        {
            paginationCriteria.Filter = paginationCriteria.Filter ?? Builders<T>.Filter.Empty;
            var query = _collection.Find(paginationCriteria.Filter).Skip((paginationCriteria.Page - 1) * paginationCriteria.PageSize).Limit(paginationCriteria.PageSize);
            return new PaginationResponse<T>
            {
                Count = await query.CountDocumentsAsync().ConfigureAwait(false),
                Items = query.ToList()
            };
        }

        public async Task<T> CreateAsync(T t)
        {
            await _collection.InsertOneAsync(t);
            return t;
        }

        public async Task UpdateAsync(string id, T t) => await _collection.ReplaceOneAsync(book => book.Id == id, t);

        public async Task RemoveAsync(T t) => await _collection.DeleteOneAsync(book => book.Id == t.Id);

        public async Task RemoveAsync(string id) => await _collection.DeleteOneAsync(book => book.Id == id);
    }
}
