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
        [RegularExpression(@"^\+?[0-9]*$", ErrorMessage = "Phone number must be numeric and can optionally start with a '+' sign.")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Customer ID is required.")]
        public int CID { get; set; } // Foreign key to Customer

        [ForeignKey("CID")]
        public Customer Customer { get; set; }
    }

}
