using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class RegisterCustomerDto
    {
        [RegularExpression(@"^[a-zA-Z]+(?:[.][a-zA-Z]+)*$", ErrorMessage = "First name must contain only letters.")]
        public string FirstName { get; set; }

        [RegularExpression(@"^[a-zA-Z]+(?:[.][a-zA-Z]+)*$", ErrorMessage = "Last name must contain only letters.")]
        public string LastName { get; set; }

        //[RegularExpression(@"^[A-Za-z0-9'\.\-\s\,]$", ErrorMessage = "Address contains invalid characters.")]
        public string Address { get; set; }

        [RegularExpression(@"^[a-zA-Z]+(?:[.][a-zA-Z]+)*$", ErrorMessage = "Company name contains invalid characters.")]
        public string Company { get; set; }

        //[Range(1, int.MaxValue, ErrorMessage = "UserId must be a positive integer.")]
        public int CreatedBy { get; set; }

        [RegularExpression(@"^[a-zA-Z]+(?:[.][a-zA-Z]+)*$", ErrorMessage = "Position contains invalid characters.")]
        public string Position { get; set; }

        [RegularExpression(@"^\d{10}$",
            ErrorMessage = "Phone number format is invalid.")]
        public string PhoneNumber { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", ErrorMessage = "Email is not valid.")]
        public string Email { get; set; }
    }
}
