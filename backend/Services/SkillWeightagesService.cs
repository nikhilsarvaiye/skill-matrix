namespace Services
{
    using Abstractions;
    using Common.Abstractions;
    using Common.Helpers;
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

            skillWeightage = (await this.UpdateSkillNames(new List<SkillWeightages> { skillWeightage })).FirstOrDefault();

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

        private async Task<List<SkillWeightages>> UpdateSkillNames(List<SkillWeightages> skillWeightages)
        {
            var allSkillWeightages = skillWeightages.Select(x => x.Skills).ToList().FlattenList().ToList();

            var skillIds = GetSkillIdsFromSkillWeightages(allSkillWeightages);

            if (!skillIds.Any())
            {
                return skillWeightages;
            }

            var skills = await _skillService.GetAsync(skillIds).ConfigureAwait(false);

            foreach (var skillWeightage in skillWeightages)
            {
                skillWeightage.Skills = UpdateSkillNamesToSkillWeightages(skillWeightage.Skills, skills);
            }

            return skillWeightages;
        }

        private List<string> GetSkillIdsFromSkillWeightages(List<SkillWeightage> skillWeightages)
        {
            var skillIds = new List<string>();

            foreach (var skillWeightage in skillWeightages)
            {
                if(skillWeightage.Skills.Count > 0)
                {
                    skillIds.AddRange(GetSkillIdsFromSkillWeightages(skillWeightage.Skills));
                }
                skillIds.Add(skillWeightage.Id);
            }

            return skillIds;
        }

        private List<SkillWeightage> UpdateSkillNamesToSkillWeightages(List<SkillWeightage> skillWeightages, List<Skill> skills)
        {
            foreach (var skillWeightage in skillWeightages)
            {
                if (skillWeightage.Skills.Count > 0)
                {
                    skillWeightage.Skills = UpdateSkillNamesToSkillWeightages(skillWeightage.Skills, skills);
                }

                skillWeightage.Name = skills.FirstOrDefault(x => x.Id == skillWeightage.Id).Name;
            }

            return skillWeightages;
        }
    }
}
