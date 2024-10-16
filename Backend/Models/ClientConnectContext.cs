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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           

            modelBuilder.Entity<Customer>()
             .HasMany(c => c.Notes)  // A Customer has many Notes 
             .WithOne(n => n.Customer) // Each Note has one Customer 
             .HasForeignKey(n => n.CreatedFor) // Foreign key in Note
             .OnDelete(DeleteBehavior.Cascade); // Cascade delete when Customer is deleted


            modelBuilder.Entity<Customer>()
             .HasMany(c => c.PhoneNumbers)  // A Customer has many PhoneNumbers
             .WithOne(p => p.Customer) // Each PhoneNumber has one Customer 
             .HasForeignKey(p => p.CID) // Foreign key in Phone
             .OnDelete(DeleteBehavior.Cascade); // Cascade delete when Customer is deleted

            modelBuilder.Entity<Customer>()
             .HasMany(c => c.Emails)  // A Customer has many Emails
             .WithOne(e => e.Customer) // Each Email has one Customer 
             .HasForeignKey(e => e.CID) // Foreign key in Email
             .OnDelete(DeleteBehavior.Cascade); // Cascade delete when Customer is deleted

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();  // This ensures the Email column is unique

            base.OnModelCreating(modelBuilder);
        }
    }
}
