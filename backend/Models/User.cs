namespace Models
{
    using System;

    public class User : BaseModel
    {
        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }

        public string PasswordHash { get; set; }

        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        public string LastName { get; set; }

        public DateTime? DOB { get; set; }

        public Gender Gender { get; set; } = Gender.Unknown;

        public string Address1 { get; set; }

        public string Address2 { get; set; }

        public string City { get; set; }

        public string ZipCode { get; set; }

        public string StateId { get; set; }

        public string CountryId { get; set; }

        public string Phone1 { get; set; }

        public string Phone2 { get; set; }

        public string DesignationId { get; set; }
    }
}
