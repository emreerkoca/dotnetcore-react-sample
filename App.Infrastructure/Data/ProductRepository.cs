using App.Core.Entities;
using App.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Infrastructure.Data
{
    public class ProductRepository : EfRepository<Product>, IProductRepository
    {
        public ProductRepository(AppDbContext appDbContext) : base(appDbContext)
        {

        }

        public async Task<IReadOnlyList<Product>> GetProducts()
        {
            return await _appDbContext.Product.Where(x => !x.isDeleted).ToListAsync();
        }


    }
}
