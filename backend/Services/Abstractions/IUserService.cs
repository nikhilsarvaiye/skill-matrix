namespace Services.Abstractions
{
    using Models;
    using System.Threading.Tasks;

    public interface IUserService : IService<User>
    {
        Task<LoggedInUser> LogInAsync(string id, string password);

        Task UpdateThemeAsync(string id, string theme);
    }
}
