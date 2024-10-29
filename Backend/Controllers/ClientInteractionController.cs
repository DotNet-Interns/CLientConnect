using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace Backend.Controllers
{
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

        [HttpPost("create/")]
        public async Task<ActionResult<ClientInteraction>> CreateInteraction([FromBody] CreateClientInteractionDto interaction)
        {
            if (!NoteExists(interaction.NoteId) || !UserExists(interaction.UserId))
            {
                return NotFound("Note or User not found.");
            }
            ClientInteraction newInteraction = new ClientInteraction
            {
                NoteId = interaction.NoteId,
                UserId = interaction.UserId,
                InteractionTime = DateTime.Now
            };

            _context.clientInteractions.Add(newInteraction);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInteractionById", new { id = newInteraction.CIID }, newInteraction);
        }

        private bool NoteExists(int id)
        {
            return _context.Notes.Any(i => i.NoteID == id);
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserID == id);
        }


    }
}
