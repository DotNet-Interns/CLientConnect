using Microsoft.AspNetCore.Mvc;
using Backend.Models; // Adjust according to your actual namespace
using Backend.Services; // Adjust according to your actual namespace
using System.Linq; // For querying the user data
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ClientConnectContext _context; 
        private readonly JwtTokenService _jwtTokenService; 

        public AuthController(ClientConnectContext context, JwtTokenService jwtTokenService)
        {
            _context = context;
            _jwtTokenService = jwtTokenService;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromForm] LoginRequest request)
        {
            // Validate input
            if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("Email and password are required.");
            }

            // Find user by email
            var user = await _context.Users // Assuming Users is your DbSet<User>
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            // Check if user exists and password matches
            if (user == null || !VerifyPassword(request.Password, user.Password))
            {
                return Unauthorized("Invalid email or password.");
            }

            // Generate JWT token
            var token = _jwtTokenService.GenerateJwtToken(user.Email, user.Role.ToString()); // Assuming Role is a property in User model

            return Ok(new { Token = token });
        }

        private bool VerifyPassword(string enteredPassword, string storedHash)
        {
            return BCrypt.Net.BCrypt.Verify(enteredPassword, storedHash);
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
