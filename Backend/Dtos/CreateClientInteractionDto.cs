using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class CreateClientInteractionDto
    {
        [Range(1, int.MaxValue, ErrorMessage = "NoteId must be a positive integer.")]
        public int NoteId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "UserId must be a positive integer.")]
        public int UserId { get; set; }
    }
}
