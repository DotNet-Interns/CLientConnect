using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class CustomerUpdateDto
    {
        [Range(1, int.MaxValue, ErrorMessage = "UserId must be a positive integer.")]
        public int cid { get; set; }

        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "First name must contain only letters.")]
        public string firstName { get; set; }

        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Last name must contain only letters.")]
        public string lastName { get; set; }

        public string company { get; set; }

        public string position { get; set; }

        //[RegularExpression(@"^[a-zA-Z0-9\s,.-]+$", ErrorMessage = "Address contains invalid characters.")]
        public string address { get; set; }
    }
}
