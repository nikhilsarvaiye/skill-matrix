namespace Services
{
    using Abstractions;
    using Common.Abstractions;
    using FluentValidation;
    using Models;
    using Repositories.Abstractions;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Validators;

    public class DesignationSkillWeightagesService : BaseService<DesignationSkillWeightages>, IDesignationSkillWeightagesService
    {
        private readonly IDesignationService _designationService;
        private readonly ISkillWeightagesService _skillWeightagesService;

        public DesignationSkillWeightagesService(IDesignationSkillWeightagesRepository designationSkillWeightagesRepository, IDesignationService designationService, ISkillWeightagesService skillWeightagesService)
            : base(designationSkillWeightagesRepository)
        {
            this._designationService = designationService ?? throw new ArgumentNullException(nameof(designationService));
            this._skillWeightagesService = skillWeightagesService ?? throw new ArgumentNullException(nameof(skillWeightagesService));
        }

        public override async Task<IResponse<DesignationSkillWeightages>> PaginateAsync(IRequest request)
        {
            var designationSkillWeightages = await base.PaginateAsync(request);

            designationSkillWeightages.Items = await this.UpdateNames(designationSkillWeightages.Items);

            return designationSkillWeightages;
        }

        public override async Task<List<DesignationSkillWeightages>> GetAsync(IRequest request = null)
        {
            var designationSkillWeightages = await base.GetAsync(request).ConfigureAwait(false);

            designationSkillWeightages = await this.UpdateNames(designationSkillWeightages);

            return designationSkillWeightages;
        }

        public override async Task<DesignationSkillWeightages> GetAsync(string id)
        {
            var designationSkillWeightage = await base.GetAsync(id).ConfigureAwait(false);

            designationSkillWeightage = (await this.UpdateNames(new List<DesignationSkillWeightages> { designationSkillWeightage })).FirstOrDefault();

            return designationSkillWeightage;
        }

        public override async Task ValidateOnCreate(DesignationSkillWeightages designationSkillWeightages)
        {
            var designationSkillWeightagesValidator = new DesignationSkillWeightagesValidator();

            designationSkillWeightagesValidator.ValidateAndThrow(designationSkillWeightages);

            await Task.CompletedTask;
        }

        public override async Task ValidateOnUpdate(DesignationSkillWeightages designationSkillWeightages)
        {
            await this.ValidateOnCreate(designationSkillWeightages);
        }

        public override async Task ValidateOnDelete(string id)
        {
            await Task.CompletedTask;
        }

        private async Task<List<DesignationSkillWeightages>> UpdateNames(List<DesignationSkillWeightages> designationSkillWeightages)
        {
            var designationIds = designationSkillWeightages.Select(x => x.DesignationId).ToList();
            var skillWeightagesIds = designationSkillWeightages.Select(x => x.SkillWeightagesId).ToList();

            var designations = await _designationService.GetAsync(designationIds).ConfigureAwait(false);
            var skillWeightages = await _skillWeightagesService.GetAsync(skillWeightagesIds).ConfigureAwait(false);

            foreach (var designationSkillWeightage in designationSkillWeightages)
            {
                designationSkillWeightage.DesignationName = designations.FirstOrDefault(x => designationSkillWeightage.DesignationId == x.Id).Name;
                designationSkillWeightage.SkillWeightagesName = skillWeightages.FirstOrDefault(x => designationSkillWeightage.SkillWeightagesId == x.Id).Name;
            }

            return designationSkillWeightages;
        }
    }
}
