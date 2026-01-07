using System.ComponentModel.DataAnnotations;

namespace ProductApi.Models
{
    public class Product
    {
        // Primary Key (Auto-increment)
        public int Id { get; set; }

        // Product title (cannot be null)
        [Required]
        public string Title { get; set; }

        // Product price
        [Required]
        public decimal Price { get; set; }

        // Optional description
        public string? Description { get; set; }

        // Manufacturer date
        public DateTime ManufacturerDate { get; set; }
    }
}
