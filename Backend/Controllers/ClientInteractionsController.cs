using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientInteractionsController : ControllerBase
    {
        private readonly ClientConnectContext _context;

        public ClientInteractionsController(ClientConnectContext context)
        {
            _context = context;
        }

        // GET: api/ClientInteractions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClientInteraction>>> GetclientInteractions()
        {
            return await _context.clientInteractions.ToListAsync();
        }

        // GET: api/ClientInteractions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClientInteraction>> GetClientInteraction(int id)
        {
            var clientInteraction = await _context.clientInteractions.FindAsync(id);

            if (clientInteraction == null)
            {
                return NotFound();
            }

            return clientInteraction;
        }

        // PUT: api/ClientInteractions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClientInteraction(int id, ClientInteraction clientInteraction)
        {
            if (id != clientInteraction.CIID)
            {
                return BadRequest();
            }

            _context.Entry(clientInteraction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientInteractionExists(id))
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

        // POST: api/ClientInteractions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ClientInteraction>> PostClientInteraction(ClientInteraction clientInteraction)
        {
            _context.clientInteractions.Add(clientInteraction);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClientInteraction", new { id = clientInteraction.CIID }, clientInteraction);
        }

        // DELETE: api/ClientInteractions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClientInteraction(int id)
        {
            var clientInteraction = await _context.clientInteractions.FindAsync(id);
            if (clientInteraction == null)
            {
                return NotFound();
            }

            _context.clientInteractions.Remove(clientInteraction);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClientInteractionExists(int id)
        {
            return _context.clientInteractions.Any(e => e.CIID == id);
        }
    }
}
