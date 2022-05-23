using Microsoft.EntityFrameworkCore;
using PslibWebApp.Data;
using PslibWebApp.Models;

namespace PslibWebApp.Services
{
    public class UserRepository : RepositoryBase<Guid, User>, IRepository<Guid, User>
    {
        public UserRepository(ApplicationDbContext context): base(context) {}

        public override void Update(User entity)
        {
            base.Update(entity);
            entity.UpdatedDate = DateTime.Now;
        }
    }
}
