using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class UserRequestDto
    {
        [RegularExpression(@"^[a-zA-Z]+(?:[.][a-zA-Z]+)*$", ErrorMessage = "First name must contain only letters.")]
        [Required(ErrorMessage = "Firstname is required.")]
        public required string FirstName { get; set; }

        [RegularExpression(@"^[a-zA-Z]+(?:[.][a-zA-Z]+)*$", ErrorMessage = "Last name must contain only letters.")]
        [Required(ErrorMessage = "Lastname is required.")]
        public required string LastName { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]
        [Required(ErrorMessage = "Email is required.")]
        public required string Email { get; set; }

        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$",
            ErrorMessage = "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.")]
        [Required(ErrorMessage = "Password is required.")]
        public required string Password { get; set; }
    }
}
