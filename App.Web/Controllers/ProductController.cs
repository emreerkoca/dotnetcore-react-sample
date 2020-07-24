using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Core.Entities;
using App.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace App.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpPost("add-product")]
        public async Task<IActionResult> AddProduct([FromBody] Product product)
        {
            var result = await _productRepository.AddAsync(product);

            if (result == null)
            {
                return BadRequest("Could not add!");
            }

            return Ok(product);
        }

        [HttpGet("get-products")]
        public async Task<IActionResult> GetProducts()
        {
            IReadOnlyList<Product> productList = await _productRepository.GetProducts();

            if (productList == null)
            {
                return BadRequest("Could not get products");
            }

            return Ok(productList);
        }

        [HttpPut("update-product/{productId}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] int productId, [FromBody] Product updatedProduct)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (productId != updatedProduct.Id)
            {
                return BadRequest();
            }

            await _productRepository.UpdateAsync(updatedProduct);

            return Ok(updatedProduct);
        }

        [HttpDelete("delete-product/{productId}")]
        public async Task<IActionResult> DeleteWord(int productId)
        {
            Product deletedProduct = _productRepository.GetById(productId);

            deletedProduct.isDeleted = true;

            await _productRepository.UpdateAsync(deletedProduct);

            return Ok("1");
        }
    }
}