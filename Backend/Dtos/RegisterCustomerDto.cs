using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class RegisterCustomerDto
    {
        [RegularExpression(@"^[a-zA-Z]+(?:[ .][a-zA-Z]+)*$", ErrorMessage = "First name must contain only letters.")]
        [StringLength(20 , ErrorMessage = "Length must be between 1 - 20 ")]
        [Required(ErrorMessage = "Firstname is required.")]
        public string FirstName { get; set; }

        [RegularExpression(@"^[a-zA-Z]+(?:[ .][a-zA-Z]+)*$", ErrorMessage = "Last name must contain only letters.")]
        [StringLength(20, ErrorMessage = "Length must be between 1 - 20 ")]
        [Required(ErrorMessage = "Lastname is required.")]
        public string LastName { get; set; }

        //[RegularExpression(@"^[A-Za-z0-9'\.\-\s\,]$", ErrorMessage = "Address contains invalid characters.")]
        [StringLength(50, ErrorMessage = "Length must be between 1 - 50 ")]
        [Required(ErrorMessage = "Address is required.")]
        public string Address { get; set; }

        [RegularExpression(@"^[a-zA-Z]+(?:[ .][a-zA-Z]+)*$", ErrorMessage = "Company name contains invalid characters.")]
        [StringLength(20, ErrorMessage = "Length must be between 1 - 20 ")]
        [Required(ErrorMessage = "Company is required.")]
        public string Company { get; set; }

        //[Range(1, int.MaxValue, ErrorMessage = "UserId must be a positive integer.")]
        public int CreatedBy { get; set; }

        [RegularExpression(@"^[a-zA-Z0-9]+(?:[ .][a-zA-Z0-9]+)*$", ErrorMessage = "Position contains invalid characters.")]
        [StringLength(20, ErrorMessage = "Length must be between 1 - 20 ")]
        [Required(ErrorMessage = "Position is required.")]
        public string Position { get; set; }

        [RegularExpression(@"^\d{10}$",
            ErrorMessage = "Phone number format is invalid.")]
        [MinLength(10 , ErrorMessage = "Phone no. must be of 10")]
        public string PhoneNumber { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", ErrorMessage = "Email is not valid.")]
        [Required(ErrorMessage = "Email is required.")]

        public string Email { get; set; }
    }
}
