using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public enum NoteStatus
    {
        Pending,
        Completed,
        InProgress,
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
        public int NoteID { get; set; } // Fixed the typo: NotelD -> NoteID

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [StringLength(500)]
        public string Summary { get; set; }

        [Required]
        public NoteStatus Status { get; set; }

        public DateTime ExpectedCompletion { get; set; }

        public int CreatedBy { get; set; } // Foreign key for the user who created the note

        //[ForeignKey("CreatedBy")]
        //public User Creator { get; set; } // Navigation property for creator

        public int UpdatedBy { get; set; } // Foreign key for the user who updated the note

        //[ForeignKey("UpdatedBy")]
        //public User Updator { get; set; } // Navigation property for updater

        public int CreatedFor { get; set; } // Assuming this is a foreign key to Customer
        [ForeignKey("CreatedFor")]
        public Customer Customer { get; set; } // Navigation property for customer

        public DateTime CreatedAt { get; set; }
    }
}
