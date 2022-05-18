using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace PslibWebApp.Services
{
    public interface IRepository<TKey, TEntity> where TEntity : class
    {
        DbSet<TEntity> DbSet{get;}
        Task<List<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> filter);
        ValueTask<TEntity?> GetAsync(TKey key);
        void Delete(TEntity data);
        void Update(TEntity value);
        void Insert(TEntity data);
        Task SaveAsync();
    }
}
