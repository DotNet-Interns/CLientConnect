using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Backend.Services;
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
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
        
            if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("Email and password are required.");
            }

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email);

       
            if (user == null || !VerifyPassword(request.Password, user.Password))
            {
                return Unauthorized("Invalid email or password.");
            }

            var token = _jwtTokenService.GenerateJwtToken(user.UserID,user.Role.ToString());

            Response.Cookies.Append(
 "AccessToken",
 token,
 new CookieOptions
 {
     Path = "/",
     HttpOnly = true,
     Secure = true,
     MaxAge = TimeSpan.FromDays(2)
 });

            return Ok();
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
