namespace Services.Validators
{
    using FluentValidation;
    using Models;

    public class DesignationValidator : AbstractValidator<Designation>
    {
        public DesignationValidator()
        {
            CascadeMode = CascadeMode.Stop;

            RuleFor(x => x.Name).Required();
        }
    }
}
