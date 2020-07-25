using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace App.Core.Entities
{
    [Table("Tag")]
    public class Tag : BaseEntity
    {
        public string Name { get; set; }
    }
}
