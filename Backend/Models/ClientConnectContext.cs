using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    public class ClientConnectContext : DbContext
    {
        public ClientConnectContext(DbContextOptions<ClientConnectContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; } = null!; // Plural naming for convention
        public DbSet<Customer> Customers { get; set; } = null!;
        public DbSet<Email> Emails { get; set; } = null!;
        public DbSet<Phone> Phones { get; set; } = null!;
        public DbSet<Note> Notes { get; set; } = null!; // Plural naming for convention
        public DbSet<ClientInteraction> clientInteractions { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           

          

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();  // This ensures the Email column is unique

            base.OnModelCreating(modelBuilder);
        }
    }
}
