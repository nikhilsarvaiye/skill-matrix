namespace Api.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Common.Helpers;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Identity.Web.Resource;
    using Models;
    using Services.Abstractions;

    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public abstract class BaseController<T> : ControllerBase
        where T : BaseModel, new()
    {
        private readonly IService<T> _service;

        public BaseController(IService<T> service)
        {
            this._service = service ?? throw new ArgumentNullException(nameof(service));
        }

        // The Web API will only accept tokens 1) for users, and 2) having the "access_as_user" scope for this API
        static readonly string[] scopeRequiredByApi = new string[] { "access_as_user" };

        [HttpGet]
        public async Task<dynamic> GetAsync(string id = null)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
            
            if (!string.IsNullOrEmpty(id))
            {
                return new List<T>() { await this._service.GetAsync(id) };
            }

            var request = this.Request.ToPaginationCriteria<T>();

            if(request.Count)
            {
                return await this._service.PaginateAsync(request);
            }

            return await this._service.GetAsync(request);
        }

        [HttpPost]
        public async Task<T> CreateAsync(T skill)
        {
            return await this._service.CreateAsync(skill);
        }

        [HttpPut]
        public async Task UpdateAsync(string id, T skill)
        {
            if (string.IsNullOrEmpty(id))
            {
                throw new ArgumentNullException(nameof(id));
            }

            await this._service.UpdateAsync(skill.Id, skill);
        }

        [HttpDelete]
        public async Task DeleteAsync(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                throw new ArgumentNullException(nameof(id));
            }

            await this._service.RemoveAsync(id);
        }
    }
}
