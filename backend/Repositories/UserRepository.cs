using System;
namespace Repositories
{
    using Configuration.Options.Abstractions;
    using Models;
    using Repositories.Abstractions;

    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(IDbOptions dbOptions)
            : base(dbOptions, "users")
        {
        }
    }
}
