namespace Services.Validators
{
    using FluentValidation;
    using Models;

    public class DesignationSkillWeightagesValidator : AbstractValidator<DesignationSkillWeightages>
    {
        public DesignationSkillWeightagesValidator()
        {
            CascadeMode = CascadeMode.Stop;

            RuleFor(x => x.DesignationId).Required();
            RuleFor(x => x.SkillWeightagesId).Required();
        }
    }
}
