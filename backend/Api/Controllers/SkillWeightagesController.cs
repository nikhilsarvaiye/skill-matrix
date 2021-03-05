namespace Api.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services.Abstractions;

    [ApiController]
    [Route("[controller]")]
    public class SkillWeightagesController : BaseController<SkillWeightages>
    {
        public SkillWeightagesController(ISkillWeightagesService skillWeightagesService)
            : base(skillWeightagesService)
        {
        }
    }
}
