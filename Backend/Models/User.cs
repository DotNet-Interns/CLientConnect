using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public enum UserRole
    {
        Admin,
        SalesRepresentative
    }

    public enum UserStatus
    {
        Active,
        Inactive,
    }

    public class User
    {
        public User()
        {
            CreatedAt = DateTime.Now;
            Status = UserStatus.Active;
            Role = UserRole.SalesRepresentative;
            //Notes = new List<Note>(); // Initialize the collection
        }

        [Key]
        public int UserID { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required,MaxLength(50)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(256)]
        public string Password { get; set; }

        [Required]
        public UserRole Role { get; set; }

        public DateTime CreatedAt { get; set; }

        [Required]
        public UserStatus Status { get; set; }

        //public ICollection<Note> Notes { get; set; } // Navigation property
    }
}
