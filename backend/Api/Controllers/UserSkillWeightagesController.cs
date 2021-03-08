namespace Api.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services.Abstractions;
    using System;
    using System.Threading.Tasks;

    [ApiController]
    [Route("[controller]")]
    public class UserSkillWeightagesController : BaseController<UserSkillWeightages>
    {
        private readonly IUserSkillWeightagesService _userSkillWeightagesService;

        public UserSkillWeightagesController(IUserSkillWeightagesService userSkillWeightagesService)
            : base(userSkillWeightagesService)
        {
            _userSkillWeightagesService = userSkillWeightagesService ?? throw new ArgumentException(nameof(userSkillWeightagesService));
        }

        [HttpGet("default")]
        public async Task<UserSkillWeightages> GetUserDefaultAsync()
        {
            return await _userSkillWeightagesService.GetUserDefaultAsync();
        }
    }
}
