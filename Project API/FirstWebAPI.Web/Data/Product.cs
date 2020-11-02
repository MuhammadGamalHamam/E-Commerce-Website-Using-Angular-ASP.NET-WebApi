using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FirstWebAPI.Web.Data
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        
        [Required]
        public double Price { get; set; }
        
        [Required]
        public int Quantity { get; set; }

        // [Required]
        public string Img { get; set; }
    }
}