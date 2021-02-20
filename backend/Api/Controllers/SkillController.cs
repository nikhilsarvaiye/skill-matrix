namespace Api.Controllers
{
    using System;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services.Abstractions;

    [ApiController]
    [Route("[controller]")]
    public class SkillController : BaseController<Skill>
    {
        private readonly ISkillService _skillService;

        public SkillController(ISkillService skillService)
            : base(skillService)
        {
            this._skillService = skillService ?? throw new ArgumentNullException(nameof(skillService));
        }
    }
}
