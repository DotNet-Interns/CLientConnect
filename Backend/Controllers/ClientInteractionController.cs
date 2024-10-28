using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    public class ClientInteractionDto
    {
        public int CIID { get; set; }
        public int NoteId { get; set; }
        public int UserId { get; set; }
        public DateTime InteractionTime { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class ClientInteractionController : ControllerBase
    {
        private readonly ClientConnectContext _context;
        public ClientInteractionController(ClientConnectContext context)
        {
            _context = context;
        }

        // GET Interactions By Id
        [HttpGet("{id}")]
        public async Task<ActionResult<ClientInteractionDto>> GetInteractionById(int id)
        {
            var interaction = await _context.clientInteractions.FirstOrDefaultAsync(ci => ci.CIID == id);

            if (interaction == null)
            {
                return NoContent();
            }

            return Ok(interaction);
        }

        // GET Interactions By User Id
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<ClientInteractionDto>>> GetInteractionsByUserId(int userId)
        {
            var interactions = await _context.clientInteractions.Where(ci => ci.UserId == userId).ToListAsync();

            if (interactions == null || interactions.Count == 0)
            {
                return NoContent();
            }

            return Ok(interactions);
        }

        // GET interactions by Note ID
        [HttpGet("note/{noteId}")]
        public async Task<ActionResult<IEnumerable<ClientInteractionDto>>> GetInteractionsByNoteId(int noteId)
        {
            var interactions = await _context.clientInteractions.Where(ci => ci.NoteId == noteId).ToListAsync();

            if (interactions == null || interactions.Count == 0)
            {
                return NoContent();
            }

            return Ok(interactions);
        }


    }
}
