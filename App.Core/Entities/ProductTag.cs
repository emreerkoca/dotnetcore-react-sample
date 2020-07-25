using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace App.Core.Entities
{
    [Table("ProductTag")]
    public class ProductTag : BaseEntity
    {
        public virtual Tag Tag { get; set; }
        public virtual Product Product { get; set; }
        public string  TagValue { get; set; }
    }
}
