namespace Api.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services.Abstractions;

    [ApiController]
    [Route("[controller]")]
    public class DesignationSkillWeightagesController : BaseController<DesignationSkillWeightages>
    {
        public DesignationSkillWeightagesController(IDesignationSkillWeightagesService designationSkillWeightagesService)
            : base(designationSkillWeightagesService)
        {
        }
    }
}
