using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class ClientInteraction
    {
        [Key]
        public int CIID { get; set; }

        [Required(ErrorMessage = "NoteId is required.")]
        public int NoteId { get; set; }

        [ForeignKey("NoteId")]
        public Note Note { get; set; }

        [Required(ErrorMessage = "UserId is required.")]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        [Required(ErrorMessage = "Interaction time is required.")]
        [DataType(DataType.DateTime)]
        public DateTime InteractionTime { get; set; } = DateTime.Now;
    }
}
