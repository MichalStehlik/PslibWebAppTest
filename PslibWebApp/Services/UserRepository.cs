using Microsoft.EntityFrameworkCore;
using PslibWebApp.Data;
using PslibWebApp.Models;

namespace PslibWebApp.Services
{
    public class UserRepository : RepositoryBase<int, User>, IRepository<int, User>
    {
        public UserRepository(ApplicationDbContext context): base(context) {}

        public override void Update(User entity)
        {
            base.Update(entity);
            entity.UpdatedDate = DateTime.Now;
        }

        public virtual Task<User?> GetAsync(Guid id)
        {
            return DbSet.Where(u => u.IdentityId == id).SingleOrDefaultAsync();
        }
    }
}
