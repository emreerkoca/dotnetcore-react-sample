using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace App.Core.Entities
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }
        public float Price { get; set; }
        public virtual List<Tag> Tags { get; set; }
    }
}
