using Backend.Models;

namespace Backend.Dtos
{
    public class UpdateNoteDto
    {
        public int noteID { get; set; }
        public string title { get; set; }

        public string summary { get; set; }

        public bool isCustomer { get; set; }

        public int? CreatedFor { get; set; }


        public int updatedBy { get; set; }

        public DateTime? expectedCompletion { get; set; } = null;
    }
}
