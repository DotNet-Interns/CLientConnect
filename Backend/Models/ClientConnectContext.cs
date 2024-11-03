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
        public DbSet<ClientInteraction> ClientInteractions { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // Ensure base configurations are applied

            // Seeding initial data
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    UserID = 1,
                    FirstName = "Admin",
                    LastName = "Admin",
                    Email = "Admin@gmail.com", 
                    Password = "$2a$11$RbjXKNeloLiLw/Lr1PDrGeJSskgCabgGkUQ68ivNTkQ0yM0m2glpG", 
                    Role = UserRole.Admin,
                }
            );

            // Seed other entities as necessary
        }
    }
}
