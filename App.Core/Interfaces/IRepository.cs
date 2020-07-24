using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Interfaces
{
    public interface IRepository<T> 
    {
        T GetById(int id);
        ValueTask<T> GetByIdAsync(int id);
        Task<IReadOnlyList<T>> GetListAllAsync();
        Task<T> AddAsync(T entity);
        Task<bool> UpdateAsync(T entity);
        Task<bool> DeleteAsync(T entity);
    }
}
