using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class EmailDto
    {
        public int eid { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]
        public string email { get; set; }
    }
}
