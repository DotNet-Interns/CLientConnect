using Backend.Models;

namespace Backend.Dtos
{
    public class RecentNoteDto
    {
        public int NoteID { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public NoteStatus Status { get; set; }
        public DateTime? ExpectedCompletion { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public string CreatedFor { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
