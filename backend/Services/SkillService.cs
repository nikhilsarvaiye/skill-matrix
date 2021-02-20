namespace Services
{
    using Abstractions;
    using Common.Abstractions;
    using Common.Models;
    using FluentValidation;
    using Models;
    using Repositories.Abstractions;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Validators;

    public class SkillService : BaseService<Skill>, ISkillService
    {
        public SkillService(ISkillRepository skillRepository)
            : base(skillRepository)
        {
        }

        public override async Task<IResponse<Skill>> PaginateAsync(IRequest request)
        {
            var skills = await base.PaginateAsync(request);

            skills.Items = await this.UpdateParentSkills(skills.Items);

            return skills;
        }

        public override async Task<List<Skill>> GetAsync(IRequest request = null)
        {
            var skills = await base.GetAsync(request).ConfigureAwait(false);

            skills = await this.UpdateParentSkills(skills);

            return skills;
        }

        public override async Task<Skill> GetAsync(string id)
        {
            var skill = await base.GetAsync(id).ConfigureAwait(false);

            skill = (await this.UpdateParentSkills(new List<Skill> { skill })).FirstOrDefault();

            return skill;
        }

        public override async Task ValidateOnCreate(Skill skill)
        {
            var patientValidator = new SkillValidator(this);

            patientValidator.ValidateAndThrow(skill);

            await Task.CompletedTask;
        }

        public override async Task ValidateOnUpdate(Skill skill)
        {
            await this.ValidateOnCreate(skill);
        }

        public override async Task ValidateOnDelete(string id)
        {
            await Task.CompletedTask;
        }

        private async Task<List<Skill>> UpdateParentSkills(List<Skill> skills)
        {
            var parentSkillIds = skills.Where(x => !string.IsNullOrEmpty(x.ParentSkillId)).Select(x => x.ParentSkillId).ToList();

            if(!parentSkillIds.Any())
            {
                return skills;
            }

            var parentSkills = await this.GetAsync(parentSkillIds).ConfigureAwait(false);

            foreach (var skill in skills)
            {
                skill.ParentSkillName = parentSkills.FirstOrDefault(x => x.Id == skill.ParentSkillId)?.Name;
            }

            return skills;
        }
    }
}
