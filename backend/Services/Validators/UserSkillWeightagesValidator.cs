namespace Services.Validators
{
    using FluentValidation;
    using Models;

    public class UserSkillWeightagesValidator : AbstractValidator<SkillWeightages>
    {
        public UserSkillWeightagesValidator()
        {
            CascadeMode = CascadeMode.Stop;

            RuleFor(x => x.Name).Required();
        }
    }
}
