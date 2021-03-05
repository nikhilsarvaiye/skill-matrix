namespace Repositories
{
    using Configuration.Options.Abstractions;
    using Models;
    using Repositories.Abstractions;

    public class DesignationSkillWeightagesRepository : BaseRepository<DesignationSkillWeightages>, IDesignationSkillWeightagesRepository
    {
        public DesignationSkillWeightagesRepository(IDbOptions dbOptions)
            : base(dbOptions, "designationSkillWeightages")
        {
        }
    }
}
