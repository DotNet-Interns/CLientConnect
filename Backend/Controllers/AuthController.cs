using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using NuGet.Protocol;
using Backend.Dtos;

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
        public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
        {
            if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("Email and password are required.");
            }

            try
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == request.Email);

                if (user == null)
                {
                    return BadRequest("Email does not exist.");
                }

                if (user.Status == UserStatus.Inactive)
                {
                    return Unauthorized("User account is inactive.");
                }

                if (!VerifyPassword(request.Password, user.Password))
                {
                    return Unauthorized("Invalid email or password.");
                }

                var token = _jwtTokenService.GenerateJwtToken(user.UserID, user.Role.ToString());

                return Ok(new { token, user });
            }
            catch (Exception ex)
            {
               // _logger.LogError(ex, "An error occurred during the login process for email: {Email}", request.Email);
                return StatusCode(500, "An internal server error occurred.");
            }
        }

        private bool VerifyPassword(string enteredPassword, string storedHash)
        {
            return BCrypt.Net.BCrypt.Verify(enteredPassword, storedHash);
        }
    }

    
}
