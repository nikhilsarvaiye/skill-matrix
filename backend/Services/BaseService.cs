namespace Services
{
    using Common.Abstractions;
    using Models;
    using Repositories.Abstractions;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public abstract class BaseService<M>
        where M: BaseModel, new()
    {
        private readonly IRepository<M> _repository;

        public BaseService(IRepository<M> repository)
        {
            this._repository = repository ?? throw new ArgumentException(nameof(repository));
        }

        public abstract Task ValidateOnCreate(M t);

        public abstract Task ValidateOnUpdate(M t);

        public abstract Task ValidateOnDelete(string id);
        
        public async Task<M> CreateAsync(M t)
        {
            await this.ValidateOnCreate(t);

            return await this._repository.CreateAsync(t).ConfigureAwait(false);
        }

        public virtual async Task<IResponse<M>> PaginateAsync(IRequest request)
        {
            return await this._repository.PaginateAsync(request);
        }

        public virtual async Task<List<M>> GetAsync(IRequest request = null)
        {
            return await this._repository.GetAsync(request).ConfigureAwait(false);
        }

        public virtual async Task<M> GetAsync(string id)
        {
            return await this._repository.GetAsync(id).ConfigureAwait(false);
        }

        public virtual async Task<M> GetOrThrowAsync(string id)
        {
            var item = await this._repository.GetAsync(id).ConfigureAwait(false);
            if(item == null)
            {
                throw new Exception("Resource not found with Id " + id);
            }
            return item;
        }

        public virtual async Task<List<M>> GetAsync(List<string> ids)
        {
            return await this._repository.GetAsync(ids).ConfigureAwait(false);
        }

        public virtual async Task RemoveAsync(M t)
        {
            await this._repository.RemoveAsync(t).ConfigureAwait(false);
        }

        public virtual async Task RemoveAsync(string id)
        {
            await this.ValidateOnDelete(id);

            await this._repository.RemoveAsync(id).ConfigureAwait(false);
        }

        public virtual async Task UpdateAsync(string id, M t)
        {
            await this.ValidateOnUpdate(t);

            await this._repository.UpdateAsync(id, t).ConfigureAwait(false);
        }

    }
}
