using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Models;

namespace TodoApp.Api.Data;
public class TodoContext : DbContext
{
    public TodoContext(DbContextOptions<TodoContext> options) : base(options)
    {
    }

    public DbSet<Todo> Todos { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Todo>()
            .HasKey(t => t.Id);
        modelBuilder.Entity<Todo>()
            .Property(t => t.Title)
            .IsRequired()
            .HasMaxLength(200);
        modelBuilder.Entity<Todo>()
            .Property(t => t.Description)
            .HasMaxLength(1000);
    }
}
