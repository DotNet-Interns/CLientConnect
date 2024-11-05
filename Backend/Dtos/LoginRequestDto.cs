using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class LoginRequestDto
    {
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        public string Email { get; set; }

        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$",
            ErrorMessage = "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character.")]
        public string Password { get; set; }
    }
}
