using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Note
    {
        [Key]
        public int NotelD { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [StringLength(500)]
        public string Summary { get; set; }

        [Required]
        public string Status { get; set; }

        public DateTime ExpectedCompletion { get; set; }

        public int CreatedBy { get; set; } // Assuming this is a foreign key to UserID

        public int CreatedFor { get; set; } // Assuming this is a foreign key to UserID

        public DateTime CreatedAt { get; set; }
    }
}
