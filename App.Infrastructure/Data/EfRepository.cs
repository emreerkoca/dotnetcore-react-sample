using App.Core.Entities;
using App.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace App.Infrastructure.Data
{
    public class EfRepository<T> : IAsyncRepository<T> where T : BaseEntity
    {
        protected readonly AppDbContext _appDbContext;

        public EfRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<T> AddAsync(T entity)
        {
            await _appDbContext.Set<T>().AddAsync(entity);

            return entity;
        }

        public async Task<bool> DeleteAsync(T entity)
        {
            _appDbContext.Set<T>().Remove(entity);
            var saveResult = await _appDbContext.SaveChangesAsync();

            return saveResult == 1;
        }

        public virtual ValueTask<T> GetByIdAsync(int id)
        {
            return _appDbContext.Set<T>().FindAsync(id);
        }

        public async Task<bool> UpdateAsync(T entity)
        {
            _appDbContext.Entry(entity).State = EntityState.Modified;
            var saveResult = await _appDbContext.SaveChangesAsync();

            return saveResult == 1;
        }

        public async Task<IReadOnlyList<T>> GetListAllAsync()
        {
            return await _appDbContext.Set<T>()
                .ToListAsync();
        }
    }
}
