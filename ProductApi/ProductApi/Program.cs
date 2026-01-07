using Microsoft.EntityFrameworkCore;
using ProductApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Add controller support
builder.Services.AddControllers();

// Register EF Core with SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

// Enable CORS for React
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

var app = builder.Build();

// Enable CORS
app.UseCors("AllowReact");

// Map controllers
app.MapControllers();

// Run app
app.Run();
