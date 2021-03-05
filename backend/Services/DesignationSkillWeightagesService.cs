namespace Services
{
    using Abstractions;
    using FluentValidation;
    using Models;
    using Repositories.Abstractions;
    using System.Threading.Tasks;
    using Validators;

    public class DesignationSkillWeightagesService : BaseService<DesignationSkillWeightages>, IDesignationSkillWeightagesService
    {
        public DesignationSkillWeightagesService(IDesignationSkillWeightagesRepository designationSkillWeightagesRepository)
            : base(designationSkillWeightagesRepository)
        {
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
    }
}
