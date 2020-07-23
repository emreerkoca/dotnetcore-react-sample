using System;
using System.Collections.Generic;
using System.Text;

namespace App.Core.Entities
{
    public class Tag : BaseEntity
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }
}
