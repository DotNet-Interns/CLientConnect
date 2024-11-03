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
        }

        [Key]
        public int UserID { get; set; }

        [Required(ErrorMessage = "First name is required.")]
        [StringLength(10, ErrorMessage = "First name cannot exceed 10 characters.")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required.")]
        [StringLength(10, ErrorMessage = "Last name cannot exceed 10 characters.")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        [StringLength(50, ErrorMessage = "Email cannot exceed 50 characters.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [StringLength(256, ErrorMessage = "Password cannot exceed 256 characters.")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Role is required.")]
        public UserRole Role { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required(ErrorMessage = "Status is required.")]
        public UserStatus Status { get; set; }

    }

}
