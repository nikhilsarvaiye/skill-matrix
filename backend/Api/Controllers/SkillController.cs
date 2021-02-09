namespace Api.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
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
        public async Task<IEnumerable<Skill>> GetAsync()
        {
            return await this._skillService.GetAsync();
        }

        [HttpGet("paginate")]
        public async Task<PaginationResponse<Skill>> PaginateAsync(PaginationCriteria<Skill> paginationCriteria)
        {
            // todo: need to get standard odata working properly
            // paginationCriteria = this.Request.ToPaginationCriteria<Skill>();

            return await this._skillService.PaginateAsync(paginationCriteria);
        }

        [HttpPost]
        public async Task<Skill> CreateAsync(Skill skill)
        {
            return await this._skillService.CreateAsync(skill);
        }
    }
}
