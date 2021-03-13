namespace Repositories
{
    using Configuration.Options.Abstractions;
    using DotnetStandardQueryBuilder.Core;
    using DotnetStandardQueryBuilder.Mongo.Extensions;
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

        public async Task<List<T>> GetAsync(IRequest request = null)
        {
            var query = this._collection.Query(request);

            return await Task.FromResult(query.ToList());
        }

        public async Task<T> GetAsync(string id) => (await _collection.FindAsync<T>(x => x.Id == id)).FirstOrDefault();
                
        public async Task<List<T>> GetAsync(List<string> ids) => (await _collection.FindAsync<T>(x => ids.Contains(x.Id))).ToList();
        
        public async Task<IResponse<T>> PaginateAsync(IRequest request)
        {
            var query = this._collection.Query(request);

            return new Response<T>
            {
                Count = await this._collection.QueryCount(request).CountDocumentsAsync().ConfigureAwait(false),
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
