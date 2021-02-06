namespace Services
{
    using Abstractions;
    using FluentValidation;
    using Models;
    using Repositories.Abstractions;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Validators;

    public class SkillService : ISkillService
    {
        private readonly ISkillRepository _skillRepository;

        public SkillService(ISkillRepository skillRepository)
        {
            this._skillRepository = skillRepository ?? throw new ArgumentException(nameof(skillRepository));
        }

        public async Task<Skill> CreateAsync(Skill skill)
        {
            var patientValidator = new SkillValidator();

            patientValidator.ValidateAndThrow(skill);

            return await this._skillRepository.CreateAsync(skill).ConfigureAwait(false);
        }

        public async Task<List<Skill>> GetAsync()
        {
            return await this._skillRepository.GetAsync().ConfigureAwait(false);
        }

        public async Task<Skill> GetAsync(string id)
        {
            return await this._skillRepository.GetAsync(id).ConfigureAwait(false);
        }

        public async Task RemoveAsync(Skill skill)
        {
            await this._skillRepository.RemoveAsync(skill).ConfigureAwait(false);
        }

        public async Task RemoveAsync(string id)
        {
            await this._skillRepository.RemoveAsync(id).ConfigureAwait(false);
        }

        public async Task UpdateAsync(string id, Skill skill)
        {
            await this._skillRepository.UpdateAsync(id, skill).ConfigureAwait(false);
        }
    }
}
