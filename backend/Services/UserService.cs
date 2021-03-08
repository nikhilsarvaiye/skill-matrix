
namespace Services
{
    using Common.Handlers;
    using FluentValidation;
    using Models;
    using Repositories.Abstractions;
    using Services.Abstractions;
    using Services.Validators;
    using System;
    using System.Threading.Tasks;

    public class UserService : BaseService<User>, IUserService
    {
        public UserService(IUserRepository userRepository)
            : base(userRepository)
        {
        }

        public new async Task<User> CreateAsync(User user)
        {
            await this.ValidateOnCreate(user);

            if (!string.IsNullOrEmpty(user.Password))
            {
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);
                user.Password = null;
                user.ConfirmPassword = null;
            }

            return await base.CreateAsync(user).ConfigureAwait(false);
        }

        public async Task<LoggedInUser> LogInAsync(string id, string password)
        {
            var user = await this.GetAsync(id);

            if (user == null)
            {
                throw new Exception($"Invalid User Id.");
            }

            if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                throw new Exception($"Invalid Password.");
            }

            var accesssToken = new JwtSecurityTokenHandler().GenerateJwtToken(user);

            return new LoggedInUser
            {
                User = user,
                AccessToken = accesssToken
            };
        }

        public override async Task ValidateOnCreate(User user)
        {
            var userValidator = new UserValidator();

            userValidator.ValidateAndThrow(user);

            await Task.CompletedTask;
        }

        public override async Task ValidateOnDelete(string id)
        {
            throw new System.NotImplementedException();
        }

        public override async Task ValidateOnUpdate(User user)
        {
            await this.ValidateOnCreate(user);
        }
    }
}
