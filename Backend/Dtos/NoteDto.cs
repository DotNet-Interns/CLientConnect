using Backend.Models;
using NuGet.DependencyResolver;

namespace Backend.Dtos
{
    public class NoteDto
    {
        public int noteID { get; set; }

        public string title { get; set; }

        public string summary { get; set; }

        public NoteStatus status { get; set; }

        public DateTime? expectedCompletion { get; set; } = null;

        public int  createdBy { get; set; }

        public int updatedBy { get; set; }

        public int createdFor { get; set; }

        public DateTime createdAt { get; set; }
    }
}
