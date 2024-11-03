using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Email
    {
        [Key]
        public int EID { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        [StringLength(100, ErrorMessage = "Email cannot exceed 100 characters.")]
        public string EmailAddress { get; set; }

        [Required(ErrorMessage = "Customer ID is required.")]
        public int CID { get; set; } // Foreign key to Customer

        [ForeignKey("CID")]
        public Customer Customer { get; set; }
    }

}
