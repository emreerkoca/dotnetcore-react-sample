using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace App.Core.Entities
{
    [Table("ProductTag")]
    public class ProductTag : BaseEntity
    {
        public int ProductId { get; set; }
        public int TagId { get; set; }
        public string  TagValue { get; set; }
    }
}
