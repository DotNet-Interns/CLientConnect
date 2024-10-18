using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class ClientInteraction
    {
        [Key]
        public int CIID { get; set; }
        [Required]
        public int NoteId { get; set; }
        [ForeignKey("NoteId")]
        public Note Note { get; set; }

        [Required]
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public DateTime InteractionTime {  get; set; } = DateTime.Now;
    }
}
