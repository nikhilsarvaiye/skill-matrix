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

            RuleFor(x => x.Name).MustAsync(async (name, cancellation) => {
                return await this.NameIsUnique(name);
            }).WithMessage("Skill already exists.");
        }

        private async Task<bool> NameIsUnique(string name)
        {
            var skills = await this._skillService.PaginateAsync(new Request
            {
                Filters = new List<IFilter>
                {
                    new Filter
                    {
                        Property = nameof(Skill.Name),
                        Operator = FilterOperator.IsEqualTo,
                        Value = name
                    }
                }
            });
            return !(skills as IEnumerable<Skill>).Any(x => x.Name == name);
        }
    }
}
