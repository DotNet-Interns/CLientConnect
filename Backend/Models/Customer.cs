using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public enum CustomerStatus
    {
        Active,
        Inactive,
    }
    public class Customer
    {
        public Customer()
        {
            CreatedAt = DateTime.Now;
            Status= CustomerStatus.Active;
            Notes = new List<Note>();
            PhoneNumbers = new List<Phone>();
            Emails = new List<Email>();
        }

        [Key]
        public int CID { get; set; }

        [Required]
        [StringLength(10)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(10)]
        public string LastName { get; set; }

        [StringLength(200)]
        public string Address { get; set; }

        [StringLength(50)]
        public string Company { get; set; }

        public int CreatedBy { get; set; } // Assuming this is a foreign key to UserID
        [ForeignKey("CreatedBy")]
        public User userId { get; set; } 

        [Required]
        public CustomerStatus Status { get; set; }

        [StringLength(50)]
        public string Position { get; set; }

        public DateTime CreatedAt { get; set; }


        public ICollection<Note> Notes { get; set; }
        public ICollection<Phone> PhoneNumbers { get; set; }
        public ICollection<Email> Emails { get; set; }


    }
}
