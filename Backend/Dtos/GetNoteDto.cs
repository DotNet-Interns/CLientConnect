using Backend.Models;

namespace Backend.Dtos
{
    public class GetNoteDto
    {
        public int noteID { get; set; }

        public string title { get; set; }

        public string summary { get; set; }

        public NoteStatus status { get; set; }

        public DateTime expectedCompletion { get; set; }


        public string createdBy { get; set; }

        public string updatedBy { get; set; }

        public DateTime createdAt { get; set; }

        

    }
}