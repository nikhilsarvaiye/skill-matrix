namespace Services
{
    using Abstractions;
    using FluentValidation;
    using Models;
    using Repositories.Abstractions;
    using System.Threading.Tasks;
    using Validators;

    public class DesignationService : BaseService<Designation>, IDesignationService
    {
        public DesignationService(IDesignationRepository designationRepository)
            : base(designationRepository)
        {
        }

        public override async Task ValidateOnCreate(Designation designation)
        {
            var designationValidator = new DesignationValidator();

            designationValidator.ValidateAndThrow(designation);

            await Task.CompletedTask;
        }

        public override async Task ValidateOnUpdate(Designation designation)
        {
            await this.ValidateOnCreate(designation);
        }

        public override async Task ValidateOnDelete(string id)
        {
            await Task.CompletedTask;
        }
    }
}
