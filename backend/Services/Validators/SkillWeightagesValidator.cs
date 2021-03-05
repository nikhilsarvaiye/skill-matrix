namespace Services.Validators
{
    using FluentValidation;
    using Models;

    public class SkillWeightagesValidator : AbstractValidator<SkillWeightages>
    {
        public SkillWeightagesValidator()
        {
            CascadeMode = CascadeMode.Stop;

            RuleFor(x => x.Name).Required();
        }
    }
}
