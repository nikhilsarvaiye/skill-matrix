namespace Services
{
    using Abstractions;
    using Services.Helpers;
    using FluentValidation;
    using Models;
    using Repositories.Abstractions;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Validators;

    public class SkillWeightagesService : BaseService<SkillWeightages>, ISkillWeightagesService
    {
        private readonly ISkillService _skillService;

        public SkillWeightagesService(ISkillWeightagesRepository skillWeightagesRepository, ISkillService skillService)
            : base(skillWeightagesRepository)
        {
            _skillService = skillService ?? throw new ArgumentNullException(nameof(skillService));
        }

        public override async Task<SkillWeightages> GetAsync(string id)
        {
            var skillWeightage = await base.GetAsync(id).ConfigureAwait(false);

            skillWeightage = (await (new List<SkillWeightages> { skillWeightage }).UpdateSkillNames(_skillService)).FirstOrDefault();

            return skillWeightage;
        }

        public override async Task ValidateOnCreate(SkillWeightages skillWeightages)
        {
            var skillWeightagesValidator = new SkillWeightagesValidator();

            skillWeightagesValidator.ValidateAndThrow(skillWeightages);

            await Task.CompletedTask;
        }

        public override async Task ValidateOnUpdate(SkillWeightages skillWeightages)
        {
            await this.ValidateOnCreate(skillWeightages);
        }

        public override async Task ValidateOnDelete(string id)
        {
            await Task.CompletedTask;
        }
    }
}
