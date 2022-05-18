using Microsoft.EntityFrameworkCore;
using PslibWebApp.Models;

namespace PslibWebApp.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(u => u.Email).IsUnique();
                entity.HasIndex(u => u.IdentityId).IsUnique();
                entity.Property(u => u.CreatedDate).HasDefaultValueSql("getdate()");
                entity.Property(u => u.UpdatedDate).HasDefaultValueSql("getdate()");
            });
        }
    }
}
