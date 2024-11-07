using System;
using System.ComponentModel.DataAnnotations;
using Backend.Models;

namespace Backend.Dtos
{
    public class UpdateNoteDto
    {
        //[Range(1, int.MaxValue, ErrorMessage = "Note ID must be a positive integer.")]
        public int noteID { get; set; }

        [Required(ErrorMessage = "Title is required.")]
        [StringLength(100, ErrorMessage = "Title cannot exceed 100 characters.")]
        public string title { get; set; }

        [StringLength(500, ErrorMessage = "Summary cannot exceed 500 characters.")]
        [Required(ErrorMessage = "Summary is required.")]
        public string summary { get; set; }

        [Required(ErrorMessage = "True/False is required.")]
        public bool isCustomer { get; set; }

        //[Range(1, int.MaxValue, ErrorMessage = "CreatedFor ID must be a positive integer.")]
        
        public int? CreatedFor { get; set; }

        //[Range(1, int.MaxValue, ErrorMessage = "UpdatedBy ID must be a positive integer.")]
        [Required]
        public int updatedBy { get; set; }

        public DateTime? expectedCompletion { get; set; } = null;
    }
}
