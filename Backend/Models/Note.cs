using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public enum NoteStatus
    {
        Pending,
        Completed,
        Cancelled
    }

    public class Note
    {
        public Note()
        {
            CreatedAt = DateTime.Now;
            Status = NoteStatus.Pending;
        }

        [Key]
        public int NoteID { get; set; }

        [Required(ErrorMessage = "Title is required.")]
        [StringLength(100, ErrorMessage = "Title cannot exceed 100 characters.")]
        public string Title { get; set; }

        [StringLength(500, ErrorMessage = "Summary cannot exceed 500 characters.")]
        public string Summary { get; set; }

        [Required(ErrorMessage = "Status is required.")]
        public NoteStatus Status { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime? ExpectedCompletion { get; set; } = DateTime.MaxValue;

        [Required(ErrorMessage = "CreatedBy is required.")]
        public int CreatedBy { get; set; } // Foreign key for the user who created the note

        //[ForeignKey("CreatedBy")]
        //public User Creator { get; set; } // Uncomment for navigation property

        [Required(ErrorMessage = "UpdatedBy is required.")]
        public int UpdatedBy { get; set; } // Foreign key for the user who updated the note

        //[ForeignKey("UpdatedBy")]
        //public User Updator { get; set; } // Uncomment for navigation property

        [Required(ErrorMessage = "Customer ID is required.")]
        public int CreatedFor { get; set; } // Foreign key to Customer

        [Required(ErrorMessage = "Is Customer is required")]
        public bool isCustomer { get; set; }

        //[ForeignKey("CreatedFor")]
        //public Customer Customer { get; set; } // Navigation property for customer

        [Required]
        public DateTime CreatedAt { get; set; }
    }

}
