namespace Services.Helpers
{
    using Common.Helpers;
    using Models;
    using Services.Abstractions;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public static class SkillWeightagesServiceHelper
    {
        public async static Task<List<T>> UpdateSkillNames<T>(this List<T> skillWeightages, ISkillService skillService)
            where T: SkillWeightages, new()
        {
            var allSkillWeightages = skillWeightages.Select(x => x.Skills).ToList().FlattenList().ToList();

            var skillIds = allSkillWeightages.GetSkillIdsFromSkillWeightages();

            if (!skillIds.Any())
            {
                return skillWeightages;
            }

            var skills = await skillService.GetAsync(skillIds).ConfigureAwait(false);

            foreach (var skillWeightage in skillWeightages)
            {
                skillWeightage.Skills = skillWeightage.Skills.UpdateSkillNamesToSkillWeightages(skills);
            }

            return skillWeightages;
        }

        public static List<string> GetSkillIdsFromSkillWeightages(this List<SkillWeightage> skillWeightages)
        {
            var skillIds = new List<string>();

            foreach (var skillWeightage in skillWeightages)
            {
                if (skillWeightage.Skills.Count > 0)
                {
                    skillIds.AddRange(skillWeightage.Skills.GetSkillIdsFromSkillWeightages());
                }
                skillIds.Add(skillWeightage.Id);
            }

            return skillIds;
        }

        public static List<SkillWeightage> UpdateSkillNamesToSkillWeightages(this List<SkillWeightage> skillWeightages, List<Skill> skills)
        {
            foreach (var skillWeightage in skillWeightages)
            {
                if (skillWeightage.Skills.Count > 0)
                {
                    skillWeightage.Skills = skillWeightage.Skills.UpdateSkillNamesToSkillWeightages(skills);
                }

                skillWeightage.Name = skills.FirstOrDefault(x => x.Id == skillWeightage.Id).Name;
            }

            return skillWeightages;
        }
    }
}
