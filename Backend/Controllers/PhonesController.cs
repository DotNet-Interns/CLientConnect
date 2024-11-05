using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Dtos;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhonesController : ControllerBase
    {
        private readonly ClientConnectContext _context;

        public PhonesController(ClientConnectContext context)
        {
            _context = context;
        }



        // GET: api/Phones/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<PhoneDto>> GetPhone(int id)
        {
            var phone = await _context.Phones.FindAsync(id);

            if (phone == null)
            {
                return NotFound(new { Message = "Phone not found." });
            }

            

            var phoneDto = new PhoneDto
            {
                pid = phone.PID,
                phone = phone.PhoneNumber
            };

            return Ok(phoneDto);
        }


        // PUT: api/Phones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutPhone([FromBody] PhoneDto phone)
        {
            if (phone == null || phone.pid <= 0)
            {
                return BadRequest(new { Message = "Invalid phone data." });
            }

            var existingPhone = await _context.Phones.FindAsync(phone.pid);
            if (existingPhone == null)
            {
                return NotFound(new { Message = "Phone not found." });
            }

            existingPhone.PhoneNumber = phone.phone;

            _context.Entry(existingPhone).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhoneExists(phone.pid))
                {
                    return NotFound(new { Message = "Phone not found during update." });
                }
                throw;
            }

            return NoContent();
        }


        // POST: api/Phones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Phone>> PostPhone([FromBody] AddPhoneDto phone)
        {
            if (phone == null || string.IsNullOrWhiteSpace(phone.PhoneNumber) || phone.CID <= 0)
            {
                return BadRequest(new { Message = "Invalid phone data." });
            }

            if(!_context.Customers.Any(p => p.CID == phone.CID)){
                return BadRequest("Customer Does not exist");
            }

            var currPhone = new Phone
            {
                PhoneNumber = phone.PhoneNumber,
                CID = phone.CID
            };

            _context.Phones.Add(currPhone);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // You can log the exception here if needed
                return BadRequest(new { Message = $"Error creating phone: {ex.Message}" });
            }

            return CreatedAtAction(nameof(GetPhone), new { id = currPhone.PID }, currPhone); ;
        }


        // DELETE: api/Phones/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeletePhone(int id)
        {
            var phone = await _context.Phones.FindAsync(id);

            if (phone == null)
            {
                return NotFound(new { Message = "Phone not found." });
            }

            // Check if this is the only phone associated with the customer
            var phoneCount = await _context.Phones.CountAsync(p => p.CID == phone.CID);
            if (phoneCount == 1)
            {
                return NoContent();
            }

            _context.Phones.Remove(phone);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                
                return BadRequest(new { Message = $"Error deleting phone: {ex.Message}" });
            }

            return NoContent();
        }


        private bool PhoneExists(int id)
        {
            return _context.Phones.Any(e => e.PID == id);
        }
    }
}
