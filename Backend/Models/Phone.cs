using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Phone
    {
        [Key]
        public int PID { get; set; }

        [Required(ErrorMessage = "Phone number is required.")]
        
        [StringLength(10, ErrorMessage = "Phone number cannot exceed 15 characters.")]
        [MinLength(10, ErrorMessage = "Phone number must be at least 10 characters long.")]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Phone number must be exactly 10 digits.")]

        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Customer ID is required.")]
        public int CID { get; set; } // Foreign key to Customer

        [ForeignKey("CID")]
        public Customer Customer { get; set; }
    }

}
