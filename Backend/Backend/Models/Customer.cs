using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Customer
    {
        [Key]
        public int CID { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [StringLength(200)]
        public string Address { get; set; }

        [StringLength(100)]
        public string Company { get; set; }

        public int CreatedBy { get; set; } // Assuming this is a foreign key to UserID

        [Required]
        public string CustomerStatus { get; set; }

        [StringLength(50)]
        public string Position { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
