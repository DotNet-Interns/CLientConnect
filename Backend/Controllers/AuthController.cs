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
            public AuthController(ClientConnectContext context) { _context = context; }
        [HttpPost]    
        public async Task<ActionResult<User>> Login(string email, string password)
            {
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if(BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return user;
            }
            return Unauthorized();
        }
        }
    }
