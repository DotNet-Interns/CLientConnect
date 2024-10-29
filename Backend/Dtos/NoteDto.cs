using Backend.Models;

namespace Backend.Dtos
{
    public class NoteDto
    {
        public int NoteID { get; set; }

        public string Title { get; set; }

        public string Summary { get; set; }

        public NoteStatus Status { get; set; }

        public DateTime ExpectedCompletion { get; set; }

        public int CreatedBy { get; set; }

        public int UpdatedBy { get; set; }

        public int CreatedFor { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
