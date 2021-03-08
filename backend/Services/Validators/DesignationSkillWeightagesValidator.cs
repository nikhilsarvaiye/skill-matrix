namespace Services.Validators
{
    using FluentValidation;
    using Models;

    public class DesignationSkillWeightagesValidator : AbstractValidator<DesignationSkillWeightages>
    {
        public DesignationSkillWeightagesValidator()
        {
            CascadeMode = CascadeMode.Stop;

            RuleFor(x => x).Must(x =>
                (string.IsNullOrEmpty(x.DesignationId) && string.IsNullOrEmpty(x.UserId)) ||
                (!string.IsNullOrEmpty(x.DesignationId) && !string.IsNullOrEmpty(x.UserId))
                ? false : true).WithMessage("Please select either Designation or User");
            RuleFor(x => x.SkillWeightagesId).Required();
        }
    }
}
