using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace App.Core.Entities
{
    [Table("Product")]
    public class Product : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public float Price { get; set; }
        public bool isDeleted { get; set; }
    }
}
