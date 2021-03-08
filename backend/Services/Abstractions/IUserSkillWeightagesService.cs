namespace Services.Abstractions
{
    using Models;
    using System.Threading.Tasks;

    public interface IUserSkillWeightagesService : IService<UserSkillWeightages>
    {
        Task<UserSkillWeightages> GetUserDefaultAsync();
    }
}
