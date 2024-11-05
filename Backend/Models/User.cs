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
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "First name must contain only letters.")]
        [MinLength(1)]
        [StringLength(10, ErrorMessage = "First name cannot exceed 10 characters.")]        
        public string FirstName { get; set; }

        [Required(ErrorMessage = "First name is required.")]
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "First name must contain only letters.")]
        [MinLength(1)]
        [StringLength(10, ErrorMessage = "First name cannot exceed 10 characters.")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        [StringLength(50, ErrorMessage = "Email cannot exceed 50 characters.")]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" ,ErrorMessage = "Invalid email address format.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [StringLength(256, ErrorMessage = "Password cannot exceed 256 characters.")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$",
        ErrorMessage = "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Role is required.")]
        public UserRole Role { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required(ErrorMessage = "Status is required.")]
        public UserStatus Status { get; set; }

    }

}
