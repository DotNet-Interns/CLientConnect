using System;
using System.ComponentModel.DataAnnotations;
namespace Backend.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(100)]
        public string Password { get; set; }

        [Required]
        public string Role { get; set; }

        public string CreatedAt { get; set; }

        [Required]
        public string UserStatus { get; set; }
    }
}

