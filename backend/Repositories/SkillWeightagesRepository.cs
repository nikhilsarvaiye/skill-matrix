namespace Repositories
{
    using Configuration.Options.Abstractions;
    using Models;
    using Repositories.Abstractions;

    public class SkillWeightagesRepository : BaseRepository<SkillWeightages>, ISkillWeightagesRepository
    {
        public SkillWeightagesRepository(IDbOptions dbOptions)
            : base(dbOptions, "skillWeightages")
        {
        }
    }
}
