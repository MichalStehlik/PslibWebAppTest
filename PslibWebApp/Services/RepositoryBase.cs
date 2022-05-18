using Microsoft.EntityFrameworkCore;
using PslibWebApp.Data;
using System.Linq.Expressions;

namespace PslibWebApp.Services
{
    public abstract class RepositoryBase<TKey, TEntity> : IDisposable, IRepository<TKey, TEntity> where TEntity : class
    {
        internal readonly ApplicationDbContext _context;
        public DbSet<TEntity> DbSet { get; protected set; }
        private bool _disposed = false;

        public RepositoryBase(ApplicationDbContext context)
        {
            _context = context;
            DbSet = context.Set<TEntity>();
        }

        public virtual ValueTask<TEntity?> GetAsync(TKey id)
        {
            return DbSet.FindAsync(id);
        }

        public virtual void Insert(TEntity entity)
        {
            DbSet.Add(entity);
        }

        public virtual void Delete(TEntity entity)
        {
            if (_context.Entry(entity).State == EntityState.Detached)
            {
                DbSet.Attach(entity);
            }
            DbSet.Remove(entity);
        }
        public virtual void Update(TEntity entity)
        {
            DbSet.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }

        public virtual Task SaveAsync()
        {
            return _context.SaveChangesAsync();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this._disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this._disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public Task<List<TEntity>> GetAllAsync(
            Expression<Func<TEntity, bool>> filter = null
            )
        {
            IQueryable<TEntity> query = DbSet;
            if (filter != null)
            {
                query = query.Where(filter);
            }
            return query.ToListAsync();
        }
    }
}
