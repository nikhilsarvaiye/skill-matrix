namespace Repositories
{
    using Configuration.Options.Abstractions;
    using Models;
    using Repositories.Abstractions;

    public class DesignationRepository : BaseRepository<Designation>, IDesignationRepository
    {
        public DesignationRepository(IDbOptions dbOptions)
            : base(dbOptions, "designations")
        {       
        }
    }
}
