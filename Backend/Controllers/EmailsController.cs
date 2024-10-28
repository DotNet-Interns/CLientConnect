using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Dtos;

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
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Email>>> GetEmails()
        {
            return await _context.Emails.ToListAsync();
        }

        // GET: api/Emails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Email>> GetEmail(int id)
        {
            var email = await _context.Emails.FindAsync(id);

            if (email == null)
            {
                return NotFound();
            }

            return email;
        }

        // PUT: api/Emails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut()]
        public async Task<IActionResult> PutEmail( [FromBody] EmailDto email)
        {
            //if (id != email.eid)
            //{
            //    return BadRequest();
            //}

            Email newEmail =  _context.Emails.Find(email.eid);
            

            newEmail.email = email.email;

            _context.Entry(newEmail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmailExists(email.eid))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Emails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Email>> PostEmail([FromBody] AddEmailDto email)
        {
            Console.WriteLine("Email Data");
            Console.WriteLine(email.email);
            Email currEmail = new Email();
            currEmail.email = email.email;
            currEmail.CID = email.CID;
            _context.Emails.Add(currEmail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmail", new { id = currEmail.EID }, currEmail);
        }

        // DELETE: api/Emails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmail(int id)
        {
            var email = await _context.Emails.FindAsync(id);
            if (email == null)
            {
                return NotFound();
            }

            _context.Emails.Remove(email);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmailExists(int id)
        {
            return _context.Emails.Any(e => e.EID == id);
        }
    }
}
