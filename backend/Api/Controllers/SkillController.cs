namespace Api.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Common.Abstractions;
    using Common.Helpers;
    using Common.Models;
    using Microsoft.AspNet.OData.Builder;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.OData.Edm;
    using Microsoft.OData.UriParser;
    using Models;
    using Services.Abstractions;

    [ApiController]
    [Route("[controller]")]
    public class SkillController : ControllerBase
    {
        private readonly ISkillService _skillService;

        public SkillController(ISkillService skillService)
        {
            this._skillService = skillService ?? throw new ArgumentNullException(nameof(skillService));
        }

        [HttpGet]
        public async Task<IResponse<Skill>> GetAsync(string id = null)
        {
            if (!string.IsNullOrEmpty(id))
            {
                return new List<Skill>() { await this._skillService.GetAsync(id) }.ToResponse();
            }

            // https://localhost:5001/skill?$select=Id&$filter=Id eq '01'&$orderby=Id desc&$top=1&$count=true&$search=tom
            var request = this.Request.ToPaginationCriteria<Skill>();

            return await this._skillService.PaginateAsync(request);
        }

        [HttpPost]
        public async Task<Skill> CreateAsync(Skill skill)
        {
            return await this._skillService.CreateAsync(skill);
        }

        [HttpPut]
        public async Task UpdateAsync(string id, Skill skill)
        {
            if(string.IsNullOrEmpty(id))
            {
                throw new ArgumentNullException(nameof(id));
            }

            await this._skillService.UpdateAsync(skill.Id, skill);
        }

        [HttpDelete]
        public async Task DeleteAsync(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                throw new ArgumentNullException(nameof(id));
            }

            await this._skillService.RemoveAsync(id);
        }
    }
}
