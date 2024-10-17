using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    public class UserCredentials
    {
        public string Username { get; set; }
        public string Password { get; set; } }

        [Route("api/[controller]")]
        [ApiController]
        public class AuthController : Controller
        {
            private readonly ClientConnectContext _context;
            private readonly UserService _userservice;

        public AuthController(ClientConnectContext context, UserService userservice) { _context = context; _userservice = userservice; }
        [HttpPost]    
        public async Task<ActionResult<User>> Login(string email, string password)
            {
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if(user != null && BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                var token = await _userservice.GenerateJwtToken(user);
                return Ok(new { Token = token });
            }
            return Unauthorized();
        }
        }
    }
