using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Phone
    {
        [Key]
        public int PID { get; set; }

        [Required]
        [StringLength(10)]
        public string PhoneNumber { get; set; }

        [Required]
        public int CID { get; set; } // Assuming this is a foreign key to CID in Customer

        [ForeignKey("CID")]
        public Customer Customer  { get; set; }


    }
}
