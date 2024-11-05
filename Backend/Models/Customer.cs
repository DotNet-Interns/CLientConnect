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
            Status = CustomerStatus.Active;
            Notes = new List<Note>();
            PhoneNumbers = new List<Phone>();
            Emails = new List<Email>();
        }

        [Key]
        public int CID { get; set; }

        [Required(ErrorMessage = "First name is required.")]
        [StringLength(10, ErrorMessage = "First name cannot exceed 10 characters.")]
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "First name must contain only letters.")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required.")]
        [StringLength(10, ErrorMessage = "Last name cannot exceed 10 characters.")]
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "First name must contain only letters.")]
        public string LastName { get; set; }

        [StringLength(200, ErrorMessage = "Address cannot exceed 200 characters.")]
        public string Address { get; set; }

        [StringLength(50, ErrorMessage = "Company name cannot exceed 50 characters.")]
        public string Company { get; set; }

        [Required(ErrorMessage = "CreatedBy is required.")]
        public int CreatedBy { get; set; }

        [ForeignKey("CreatedBy")]
        public User User { get; set; }

        [Required(ErrorMessage = "Status is required.")]
        public CustomerStatus Status { get; set; }

        [StringLength(50, ErrorMessage = "Position cannot exceed 50 characters.")]
        public string Position { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        public ICollection<Note> Notes { get; set; }
        public ICollection<Phone> PhoneNumbers { get; set; }
        public ICollection<Email> Emails { get; set; }
    }

}
