namespace Services.Validators
{
    using Common.Abstractions;
    using Common.Models;
    using FluentValidation;
    using Models;
    using MongoDB.Driver;
    using Services.Abstractions;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class SkillValidator : AbstractValidator<Skill>
    {
        private readonly ISkillService _skillService;

        public SkillValidator(ISkillService skillService)
        {
            this._skillService = skillService ?? throw new ArgumentNullException(nameof(skillService));

            CascadeMode = CascadeMode.Stop;

            RuleFor(x => x.Name).Required();

            RuleFor(x => x).Must(x => !this.IsUpdate(x) ? true : !string.IsNullOrEmpty(x.Id) && x.Id != x.SkillId).WithMessage("Skill cannot be its own Parent");

            RuleFor(x => x).MustAsync(async (skill, cancellation) =>
            {
                return await this.NameIsUnique(skill);
            }).WithMessage("Skill already exists.");
        }

        private async Task<bool> NameIsUnique(Skill skill)
        {
            var skills = await this._skillService.PaginateAsync(new Request
            {
                Filters = this.IsUpdate(skill) ? new List<IFilter>
                {
                    new CompositeFilter
                    {
                        LogicalOperator = LogicalOperator.And,
                        Filters = new List<IFilter>
                        {
                            new Filter
                            {
                                Property = nameof(Skill.Name),
                                Operator = FilterOperator.IsEqualTo,
                                Value = skill.Name
                            },
                            new Filter
                            {
                                Property = nameof(Skill.Id),
                                Operator = FilterOperator.IsNotEqualTo,
                                Value = skill.Id
                            }
                        }
                    }
                } : new List<IFilter>
                    {
                        new Filter
                                {
                                    Property = nameof(Skill.Name),
                                    Operator = FilterOperator.IsEqualTo,
                                    Value = skill.Name
                                },
                    }
            });
            return !(skills as IEnumerable<Skill>).Any(x => x.Name == skill.Name);
        }

        private bool IsUpdate(Skill skill)
        {
            return !string.IsNullOrEmpty(skill.Id);
        }
    }
}
