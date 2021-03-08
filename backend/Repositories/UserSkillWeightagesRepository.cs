namespace Repositories
{
    using Configuration.Options.Abstractions;
    using Models;
    using Repositories.Abstractions;

    public class UserSkillWeightagesRepository : BaseRepository<UserSkillWeightages>, IUserSkillWeightagesRepository
    {
        public UserSkillWeightagesRepository(IDbOptions dbOptions)
            : base(dbOptions, "userSkillWeightages")
        {
        }
    }
}
