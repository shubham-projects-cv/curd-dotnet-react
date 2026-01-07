using Microsoft.EntityFrameworkCore;
using ProductApi.Models;

namespace ProductApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

        // Configure database-specific rules
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Explicitly define decimal precision for Price
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 2); // 18 total digits, 2 after decimal
        }
    }
}
