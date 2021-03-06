﻿namespace Services.Validators
{
    using Common.Models;
    using DotnetStandardQueryBuilder.Core;
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

            RuleFor(x => x).Must(x => !this.IsUpdate(x) ? true : !string.IsNullOrEmpty(x.Id) && x.Id != x.ParentSkillId).WithMessage("Skill cannot be its own Parent");

            RuleFor(x => x).MustAsync(async (skill, cancellation) =>
            {
                return await this.NameIsUnique(skill);
            }).WithMessage("Skill already exists.");
        }

        private async Task<bool> NameIsUnique(Skill skill)
        {
            var skills = await _skillService.GetAsync(new Request
            {
                Filter = IsUpdate(skill) 
                    ?   new CompositeFilter
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
                        } : new Filter
                            {
                                Property = nameof(Skill.Name),
                                Operator = FilterOperator.IsEqualTo,
                                Value = skill.Name
                            }
            });
            return !skills.Any(x => x.Name == skill.Name);
        }

        private bool IsUpdate(Skill skill)
        {
            return !string.IsNullOrEmpty(skill.Id);
        }
    }
}
