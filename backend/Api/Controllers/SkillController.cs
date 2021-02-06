namespace Api.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
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

        [HttpPost]
        public async Task<Skill> CreateAsync(Skill skill)
        {
            return await this._skillService.CreateAsync(skill);
        }
    }
}
