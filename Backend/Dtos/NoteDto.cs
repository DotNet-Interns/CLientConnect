using System;
using System.ComponentModel.DataAnnotations;
using Backend.Models;

namespace Backend.Dtos
{
    public class NoteDto
    {
        [Range(1, int.MaxValue, ErrorMessage = "Note ID must be a positive integer.")]
        public int noteID { get; set; }

        [Required(ErrorMessage = "Title is required.")]
        [StringLength(100, ErrorMessage = "Title cannot exceed 100 characters.")]
        public string title { get; set; }

        [StringLength(500, ErrorMessage = "Summary cannot exceed 500 characters.")]
        public string summary { get; set; }

        [Required(ErrorMessage = "Status is required.")]
        public NoteStatus status { get; set; }

        public DateTime? expectedCompletion { get; set; } = null;

        [Range(1, int.MaxValue, ErrorMessage = "CreatedBy ID must be a positive integer.")]
        public int createdBy { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "UpdatedBy ID must be a positive integer.")]
        public int updatedBy { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "CreatedFor ID must be a positive integer.")]
        public int? createdFor { get; set; }

        public bool isCustomer { get; set; }

        public DateTime createdAt { get; set; }
    }
}
