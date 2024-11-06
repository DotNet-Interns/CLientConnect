using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Dtos;
using Azure.Core;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailsController : ControllerBase
    {
        private readonly ClientConnectContext _context;

        public EmailsController(ClientConnectContext context)
        {
            _context = context;
        }

        // GET: api/Emails
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Email>>> GetEmails()
        //{
        //    return await _context.Emails.ToListAsync();
        //}

        // GET: api/Emails/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<EmailDto>> GetEmail(int id)
        {
            try
            {
                var email = await _context.Emails.FindAsync(id);

                if (email == null)
                {
                    return NotFound(new { Message = "Email not found." });
                }

                var emailData = new EmailDto
                {
                    eid = email.EID,
                    email = email.EmailAddress
                };

                return Ok(emailData); // Return 200 OK with email data
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An internal server error occurred while retrieving the email.");
            }
        }


        // PUT: api/Emails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // PUT: api/Emails
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> PutEmail([FromBody] EmailDto email)
        {
            if (email == null || email.eid <= 0)
            {
                return BadRequest("Invalid email data.");
            }

            var existingEmail = await _context.Emails.FindAsync(email.eid);
            if (existingEmail == null)
            {
                return NotFound(new { Message = "Email not found." });
            }
            if (await _context.Emails.AnyAsync(e => e.EmailAddress == email.email))
            {
                return Conflict(new { message = "Email already exists." });
            }
            existingEmail.EmailAddress = email.email;

            _context.Entry(existingEmail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An internal server error occurred while updating the email.");
            }

            return NoContent(); // Return 204 No Content on successful update
        }

        // POST: api/Emails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // POST: api/Emails
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Email>> PostEmail([FromBody] AddEmailDto email)
        {
            if (email == null || string.IsNullOrWhiteSpace(email.email) || email.CID <= 0)
            {
                return BadRequest("Invalid email data.");
            }

            if(!_context.Customers.Any(c => c.CID == email.CID))
            {
                return BadRequest("Customer does not exits");
            }

            if (await _context.Emails.AnyAsync(e => e.EmailAddress == email.email))
            {
                return Conflict(new { message = "Email already exists." });
            }

            var currEmail = new Email
            {
                EmailAddress = email.email,
                CID = email.CID
            };

            try
            {
                _context.Emails.Add(currEmail);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An internal server error occurred while saving the email.");
            }

            return CreatedAtAction(nameof(GetEmail), new { id = currEmail.EID }, currEmail); // Use nameof for better refactoring support
        }


        // DELETE: api/Emails/5
        // DELETE: api/Emails/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteEmail(int id)
        {
            try
            {
                var email = await _context.Emails.FindAsync(id);

                if (email == null)
                {
                    return NotFound(new { Message = "Email not found." });
                }

                // Check if this is the only email for the customer
                var emails = await _context.Emails.Where(e => e.CID == email.CID).ToListAsync();

                if (emails.Count == 1) // Only one email exists
                {
                    return NoContent(); // Return 204 No Content if the only email can't be deleted
                }

                _context.Emails.Remove(email);
                await _context.SaveChangesAsync();

                return NoContent(); // Return 204 No Content on successful deletion
            }
            catch (Exception ex)
            {
                 return StatusCode(StatusCodes.Status500InternalServerError, "An internal server error occurred while deleting the email.");
            }
        }


        private bool EmailExists(int id)
        {
            return _context.Emails.Any(e => e.EID == id);
        }
    }
}
