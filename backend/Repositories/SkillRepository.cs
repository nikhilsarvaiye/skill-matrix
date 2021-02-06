namespace Repositories
{
    using Configuration.Options.Abstractions;
    using Models;
    using Repositories.Abstractions;

    public class SkillRepository : BaseRepository<Skill>, ISkillRepository
    {
        public SkillRepository(IDbOptions dbOptions)
            : base(dbOptions, "skills")
        {       
        }
    }
}
