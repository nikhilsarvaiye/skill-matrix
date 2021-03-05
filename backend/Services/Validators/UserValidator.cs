namespace Services.Validators
{
    using FluentValidation;
    using Models;

    public class UserValidator : AbstractValidator<User>
    {
        public UserValidator()
        {
            CascadeMode = CascadeMode.Stop;

            RuleFor(x => x.Name).Required().IsAlphaNumeric();

            RuleFor(x => x.FirstName).Required().IsAlphaNumeric().HasMaximumLength();
            RuleFor(x => x.MiddleName).IsAlphaNumeric().HasMaximumLength();
            RuleFor(x => x.LastName).Required().IsAlphaNumeric().HasMaximumLength();

            RuleFor(x => x.DOB).HasNotManimumValue();

            RuleFor(x => x).Must(x => !this.IsUpdate(x) ? true : x.Password != x.ConfirmPassword).WithMessage("Password and Confirm Password are not matching.");

            RuleFor(x => new Address
            {
                Address1 = x.Address1,
                Address2 = x.Address2,
                City = x.City,
                StateId = x.StateId,
                CountryId = x.CountryId,
                ZipCode = x.ZipCode
            }).SetValidator(new AddressValidator());
        }

        private bool IsUpdate(User user)
        {
            return !string.IsNullOrEmpty(user.Id);
        }
    }
}
