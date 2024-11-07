using Backend.Models;
using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class UpdateNoteStatusDto
    {
        public NoteStatus Status { get; set; }

        [Required]
        public int updatedBy { get; set; }

    }
}
