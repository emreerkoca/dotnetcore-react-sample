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
        IRepository<Tag> _tagRepository;
        IRepository<ProductTag> _productTagRepository;

        public ProductController(IRepository<Tag> tagRepository, IRepository<ProductTag> productTagRepository, IProductRepository productRepository)
        {
            _tagRepository = tagRepository;
            _productTagRepository = productTagRepository;
            _productRepository = productRepository;

        }

        [HttpPost("add-product")]
        public async Task<IActionResult> AddProduct([FromBody] Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

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

        [HttpGet("get-product/{productId}")]
        public async Task<IActionResult> GetProduct(int productId)
        {
            Product product = await _productRepository.GetByIdAsync(productId);

            if (product == null)
            {
                return BadRequest("Could not get product!");
            }

            return Ok(product);
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

        [HttpGet("get-tags")]
        public async Task<IActionResult> GetTags()
        {
            IReadOnlyList<Tag> tagList = await _tagRepository.GetListAllAsync();

            if (tagList == null)
            {
                return BadRequest("Could not get tags");
            }

            return Ok(tagList);
        }

        [HttpPost("add-tag")]
        public async Task<IActionResult> AddTag([FromBody] Tag tag)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _tagRepository.AddAsync(tag);

            if (result == null)
            {
                return BadRequest("Could not add!");
            }

            return Ok(tag);
        }

        [HttpPost("add-product-tag")]
        public async Task<IActionResult> AddProductTag([FromBody] ProductTag productTag)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _productTagRepository.AddAsync(productTag);

            if (result == null)
            {
                return BadRequest("Could not add!");
            }

            return Ok(productTag);
        }

        [HttpDelete("delete-product-tag/{productTagId}")]
        public async Task<IActionResult> DeleteProductTag(int productTagId)
        {
            ProductTag productTag = _productTagRepository.GetById(productTagId);

            await _productTagRepository.DeleteAsync(productTag);

            return Ok("1");
        }

        [HttpPut("update-product-tag/{productTagId}")]
        public async Task<IActionResult> UpdateProductTag([FromRoute] int productTagId, [FromBody] ProductTag productTag)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (productTagId != productTag.Id)
            {
                return BadRequest();
            }

            await _productTagRepository.UpdateAsync(productTag);

            return Ok(productTag);
        }
    }
}