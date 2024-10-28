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
    public class PhonesController : ControllerBase
    {
        private readonly ClientConnectContext _context;

        public PhonesController(ClientConnectContext context)
        {
            _context = context;
        }

        // GET: api/Phones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Phone>>> GetPhones()
        {
            return await _context.Phones.ToListAsync();
        }

        // GET: api/Phones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Phone>> GetPhone(int id)
        {
            var phone = await _context.Phones.FindAsync(id);

            if (phone == null)
            {
                return NotFound();
            }

            return phone;
        }

        // PUT: api/Phones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut()]
        public async Task<IActionResult> PutPhone([FromBody]PhoneDto phone)
        {

            //if (id != phone.pid)
            //{
            //    return BadRequest();
            //}
            Console.WriteLine(phone.phone);
            Phone newPhone = _context.Phones.Find(phone.pid);
            newPhone.PhoneNumber = phone.phone;
            

            _context.Entry(newPhone).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhoneExists(phone.pid))
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

        // POST: api/Phones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Phone>> PostPhone([FromBody]AddPhoneDto phone)
        {

            Phone currPhone = new Phone();
            currPhone.PhoneNumber = phone.PhoneNumber;
            currPhone.CID = phone.CID;
            _context.Phones.Add(currPhone);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPhone", new { id = currPhone.PID }, currPhone);
            
        }

        // DELETE: api/Phones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhone(int id)
        {
            var phone = await _context.Phones.FindAsync(id);
            if (phone == null)
            {
                return NotFound();
            }

            _context.Phones.Remove(phone);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PhoneExists(int id)
        {
            return _context.Phones.Any(e => e.PID == id);
        }
    }
}
