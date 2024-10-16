
using Microsoft.EntityFrameworkCore;
using System;
using Backend.Models;
 
namespace Backend.Data
{
    public class BackendContext : DbContext
    {
        public BackendContext(DbContextOptions<BackendContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Email> Emails { get; set; }
        public DbSet<Phone> Phones { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
     new User
     {
         UserID = 1,
         FirstName = "John",
         LastName = "Doe",
         Email = "john.doe@example.com",
         Password = "hashed_password_1",  // Replace with hashed password
         Role = "Admin",
         CreatedAt = DateTime.Now.ToString(),
         UserStatus = "Active"
     },
     new User
     {
         UserID = 2,
         FirstName = "Jane",
         LastName = "Smith",
         Email = "jane.smith@example.com",
         Password = "hashed_password_2",  // Replace with hashed password
         Role = "User",
         CreatedAt = DateTime.Now.ToString(),
         UserStatus = "Active"
     },
     new User
     {
         UserID = 3,
         FirstName = "Alice",
         LastName = "Brown",
         Email = "alice.brown@example.com",
         Password = "hashed_password_3",  // Replace with hashed password
         Role = "User",
         CreatedAt = DateTime.Now.ToString(),
         UserStatus = "Inactive"
     }
 );

        }
    }
}
