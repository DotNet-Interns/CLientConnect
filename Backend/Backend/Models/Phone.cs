using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Phone
    {
        [Key]
        public int PID { get; set; }

        [Required]
        [StringLength(20)]
        public string PhoneNumber { get; set; }

        public int CID { get; set; } // Assuming this is a foreign key to CID in Customer
    }
}
