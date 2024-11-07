using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class PhoneDto
    {
        public int pid { get; set; }

        [RegularExpression(@"^\d{10}$",
            ErrorMessage = "Phone number format is invalid.")]
        [MinLength(10, ErrorMessage = "Phone no. must be of 10")]
        public string phone { get; set; }
    }
}
