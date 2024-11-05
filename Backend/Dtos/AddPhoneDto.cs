using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class AddPhoneDto
    {
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Phone number must be exactly 10 digits.")]
        public string PhoneNumber { get; set; }
        [Range(1, int.MaxValue, ErrorMessage = "UserId must be a positive integer.")]
        public int CID { get; set; }
    }
}
