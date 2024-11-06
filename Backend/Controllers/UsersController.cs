using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using BCrypt.Net;
using System.IdentityModel.Tokens.Jwt;
using Backend.Services;
using Backend.Dtos;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using NuGet.Protocol.Core.Types;
using Azure.Core;

namespace Backend.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ClientConnectContext _context;
        private readonly JwtTokenService _jwtTokenService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UsersController(ClientConnectContext context, JwtTokenService jwtTokenService, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _jwtTokenService = jwtTokenService;
            _httpContextAccessor = httpContextAccessor;
        }



        // GET: /get
        [HttpGet("/get")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<User>> GetUser()
        {
            Payload userPayload = _jwtTokenService.GetJwtPayload(_httpContextAccessor.HttpContext!);

            if (userPayload == null || string.IsNullOrEmpty(userPayload.UserId))
            {
                return BadRequest(new { Message = "User ID not found in token." });
            }

            var userId = Int32.Parse(userPayload.UserId);
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return NotFound(new { Message = "User not found." });
            }

            return Ok(user);
        }

        [HttpGet()]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<User>>> GetAllUser()
        {

            return await _context.Users.ToListAsync();
        }


        [HttpGet("{start}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> GetAllUser(int start)
        {

            var users = _context.Users.Where(u => u.Role == UserRole.SalesRepresentative).ToList();
            if(users.Count - start >= 5)
            {
                return Ok(new
                {
                    list = users.GetRange(start, 5),
                    count = users.Count
                });
            }
            return Ok(new
            {
                list = users.GetRange(start, users.Count - start),
                count = users.Count
            });
        }

        [HttpGet("Active/{start}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> GetAllActiveUser(int start)
        {

            var users = _context.Users.Where(u => u.Role == UserRole.SalesRepresentative && u.Status == UserStatus.Active).ToList();
            if (users.Count - start >= 5)
            {
                return Ok(new
                {
                    list = users.GetRange(start, 5),
                    count = users.Count
                });
            }
            return Ok(new
            {
                list = users.GetRange(start, users.Count - start),
                count = users.Count
            });
        }


        [HttpGet("Inactive/{start}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> GetAllInactiveUser(int start)
        {

            var users = _context.Users.Where(u => u.Role == UserRole.SalesRepresentative && u.Status == UserStatus.Inactive).ToList();
            if (users.Count - start >= 5)
            {
                return Ok(new
                {
                    list = users.GetRange(start, 5),
                    count = users.Count
                });
            }
            return Ok(new
            {
                list = users.GetRange(start, users.Count - start),
                count = users.Count
            });
        }



        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (CheckUserRole())
            {
                return Unauthorized(new { message = "Invalid role" });
            }

            if (id != user.UserID)
            {
                return BadRequest(new { message = "User ID in the URL does not match the user object." });
            }
            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
            {
                return Conflict(new { message = "Email already exists." });
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound(new { message = "User not found." });
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while updating the user." });
                }
            }

            return NoContent();
        }


        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> PostUser([FromBody] UserRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (CheckUserRole())
            {
                return Unauthorized(new { message = "Invalid role" });
            }

            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                return Conflict(new { message = "Email already exists." });
            }

            request.Password = BCrypt.Net.BCrypt.HashPassword(request.Password);
            User user = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Password = request.Password,
                Role = UserRole.SalesRepresentative, // Set a default role if needed
                Status = UserStatus.Active // Set a default status if needed
            };

            _context.Users.Add(user);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = $"An error occurred while saving the user: {ex.Message}" });
            }

            return Ok(user);
        }


        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (CheckUserRole())
            {
                return Unauthorized(new { message = "Invalid role" });
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            _context.Users.Remove(user);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Optionally handle any exceptions that might occur during deletion
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = $"An error occurred while deleting the user: {ex.Message}" });
            }

            return NoContent(); // Success response with no content
        }


        private bool CheckUserRole()
        {
            Payload userPayload = _jwtTokenService.GetJwtPayload(_httpContextAccessor.HttpContext!);
            if (userPayload.Role == "SalesRepresentative")
            {
                Console.WriteLine("here");
                return true;
            }
            return false;
        }
        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserID == id);
        }
    }
}
