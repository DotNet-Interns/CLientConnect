using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Email
    {
        [Key]
        public int EID { get; set; }

        [Required]
        [EmailAddress]
        public string email { get; set; }

        public int CID { get; set; } // Assuming this is a foreign key to CID in Customer
        [ForeignKey("CID")]
        public Customer Customer { get; set; }
    }
}
