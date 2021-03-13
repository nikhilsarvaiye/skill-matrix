namespace Api.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services.Abstractions;

    // [Authorize]
    [ApiController]
    [Route("[controller]")]
    public abstract class BaseController<T> : ControllerBase
        where T : BaseModel, new()
    {
        private readonly IService<T> _service;

        public BaseController(IService<T> service)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
        }

        // The Web API will only accept tokens 1) for users, and 2) having the "access_as_user" scope for this API
        static readonly string[] scopeRequiredByApi = new string[] { "access_as_user" };

        [HttpGet]
        public async Task<dynamic> GetAsync(string id = null)
        {
            // HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
            
            if (!string.IsNullOrEmpty(id))
            {
                return new List<T>() { await _service.GetAsync(id) };
            }

            var request = new DotnetStandardQueryBuilder.OData.UriParser().Parse<T>(Request.QueryString.ToString());

            if(request.Count)
            {
                return await _service.PaginateAsync(request);
            }

            return await _service.GetAsync(request);
        }

        [HttpPost]
        public async Task<T> CreateAsync(T skill)
        {
            return await _service.CreateAsync(skill);
        }

        [HttpPut]
        public async Task UpdateAsync(string id, T skill)
        {
            if (string.IsNullOrEmpty(id))
            {
                throw new ArgumentNullException(nameof(id));
            }

            await _service.UpdateAsync(skill.Id, skill);
        }

        [HttpDelete]
        public async Task DeleteAsync(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                throw new ArgumentNullException(nameof(id));
            }

            await _service.RemoveAsync(id);
        }
    }
}
