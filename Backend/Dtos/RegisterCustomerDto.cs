using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class RegisterCustomerDto
    {
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "First name must contain only letters.")]
        public string FirstName { get; set; }

        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Last name must contain only letters.")]
        public string LastName { get; set; }

        //[RegularExpression(@"^[a-zA-Z0-9\s,.-]+$", ErrorMessage = "Address contains invalid characters.")]
        public string Address { get; set; }

        public string Company { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "UserId must be a positive integer.")]
        public int CreatedBy { get; set; }

        public string Position { get; set; }

        [RegularExpression(@"^\d{10}$",
            ErrorMessage = "Phone number format is invalid.")]
        public string PhoneNumber { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        public string Email { get; set; }
    }
}
