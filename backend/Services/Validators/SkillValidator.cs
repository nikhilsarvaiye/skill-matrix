namespace Services.Validators
{
    using FluentValidation;
    using Models;
    
    public class SkillValidator : AbstractValidator<Skill>
    {
        public SkillValidator()
        {
            CascadeMode = CascadeMode.Stop;

            RuleFor(x => x.Name).Required();
        }
    }
}
