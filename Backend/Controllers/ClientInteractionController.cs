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


        [HttpGet("{id}")]
        public async Task<ActionResult<ClientInteractionDto>> GetInteractionById(int id)
        {
            try
            {
                var interaction = await _context.ClientInteractions
                    .FirstOrDefaultAsync(ci => ci.CIID == id);

                if (interaction == null)
                {
                    return NotFound(new { Message = "Interaction not found." });
                }

                
                var interactionDto = new ClientInteractionDto
                {
                    CIID = interaction.CIID,
                    NoteId = interaction.NoteId,
                    UserId = interaction.UserId,
                    InteractionTime = interaction.InteractionTime
                    
                };

                return Ok(interactionDto);
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex, "An error occurred while retrieving the interaction with ID: {Id}", id);
                return StatusCode(500, new { Message = "An internal server error occurred." });
            }
        }


        

        // GET Interactions By User Id
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<ClientInteractionDto>>> GetInteractionsByUserId(int userId)
        {
            try
            {
                var interactions = await _context.ClientInteractions
                    .Where(ci => ci.UserId == userId)
                    .ToListAsync();

                if (interactions == null || !interactions.Any())
                {
                    return NotFound(new { Message = "No interactions found for this user." });
                }

                
                var interactionDtos = interactions.Select(interaction => new ClientInteractionDto
                {
                    CIID = interaction.CIID,
                    NoteId = interaction.NoteId,
                    UserId = interaction.UserId,
                    InteractionTime = interaction.InteractionTime
                    
                }).ToList();

                return Ok(interactionDtos);
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex, "An error occurred while retrieving interactions for user ID: {UserId}", userId);
                return StatusCode(500, new { Message = "An internal server error occurred." });
            }
        }


        // GET interactions by Note ID
        [HttpGet("note/{noteId}")]
        public async Task<ActionResult<IEnumerable<ClientInteractionDto>>> GetInteractionsByNoteId(int noteId)
        {
            try
            {
                var interactions = await _context.ClientInteractions
                    .Where(ci => ci.NoteId == noteId)
                    .ToListAsync();

                if (interactions == null || !interactions.Any())
                {
                    return NotFound(new { Message = "No interactions found for this note." });
                }

                
                var interactionDtos = interactions.Select(interaction => new ClientInteractionDto
                {
                    CIID = interaction.CIID,
                    NoteId = interaction.NoteId,
                    UserId = interaction.UserId,
                    InteractionTime = interaction.InteractionTime
                }).ToList();

                return Ok(interactionDtos);
            }
            catch (Exception ex)
            {
               // _logger.LogError(ex, "An error occurred while retrieving interactions for note ID: {NoteId}", noteId);
                return StatusCode(500, new { Message = "An internal server error occurred." });
            }
        }


        [HttpPost("create/")]
        public async Task<ActionResult<ClientInteraction>> CreateInteraction([FromBody] CreateClientInteractionDto interaction)
        {
            if (interaction == null)
            {
                return BadRequest("Interaction data is required.");
            }

            if (!NoteExists(interaction.NoteId) || !UserExists(interaction.UserId))
            {
                return NotFound(new { Message = "Note or User not found." });
            }

            var newInteraction = new ClientInteraction
            {
                NoteId = interaction.NoteId,
                UserId = interaction.UserId,
                InteractionTime = DateTime.Now
            };

            try
            {
                _context.ClientInteractions.Add(newInteraction);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetInteractionById), new { id = newInteraction.CIID }, newInteraction);
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex, "An error occurred while creating a new interaction.");
                return StatusCode(500, new { Message = "An internal server error occurred." });
            }
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
