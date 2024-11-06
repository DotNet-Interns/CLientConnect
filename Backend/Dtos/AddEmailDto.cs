using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class AddEmailDto
    {
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]
        public string email { get; set; }

        //[Range(1, int.MaxValue, ErrorMessage = "UserId must be a positive integer.")]
        public int CID { get; set; }
    }
}
