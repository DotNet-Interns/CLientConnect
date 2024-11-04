using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Dtos;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly ClientConnectContext _context;

        public NotesController(ClientConnectContext context)
        {
            _context = context;
        }



        // GET: api/Notes/userNotes/{id}
        [HttpGet("userNotes/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<GetNoteDto>>> GetNoteById(int id)
        {
            try
            {
                var notes = await _context.Notes
                    .Where(n => n.CreatedFor == id)
                    .Select(note => new GetNoteDto
                    {
                        noteID = note.NoteID,
                        title = note.Title,
                        summary = note.Summary,
                        status = note.Status,
                        expectedCompletion = note.ExpectedCompletion,
                        createdBy = _context.Users
                            .Where(u => u.UserID == note.CreatedBy)
                            .Select(u => u.FirstName + " " + u.LastName)
                            .FirstOrDefault() ?? "Null data",
                        updatedBy = _context.Users
                            .Where(u => u.UserID == note.UpdatedBy)
                            .Select(u => u.FirstName + " " + u.LastName)
                            .FirstOrDefault() ?? "Null data",
                        createdAt = note.CreatedAt
                    })
                    .ToListAsync();

                if (notes == null || !notes.Any())
                {
                    return NoContent();
                }

                return Ok(notes);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An internal server error occurred while retrieving notes.");
            }
        }


        // PUT: api/Notes/UpdateNoteStatus/{id}
        [HttpPut("UpdateNoteStatus/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateNoteStatus(int id, [FromBody] UpdateNoteStatusDto upnsdto)
        {
            if (upnsdto == null || !Enum.IsDefined(typeof(NoteStatus), upnsdto.Status))
            {
                return BadRequest(new { Message = "Invalid status value." });
            }

            try
            {
                var note = await _context.Notes.FindAsync(id);
                if (note == null)
                {
                    return NotFound(new { Message = "Note not found." });
                }

                note.Status = upnsdto.Status;

                _context.Entry(note).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(new { Message = "Note status updated successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An internal server error occurred while updating the note status.");
            }
        }


        // PUT: api/Notes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> PutNote([FromBody] UpdateNoteDto note)
        {
            if (note == null)
            {
                return BadRequest(new { Message = "Invalid note data." });
            }

            var upNote = await _context.Notes.FindAsync(note.noteID);
            if (upNote == null)
            {
                return NotFound(new { Message = "No note found." });
            }

            // Update note properties
            upNote.Summary = note.summary ?? upNote.Summary;
            upNote.Title = note.title ?? upNote.Title;

            if (note.expectedCompletion.HasValue)
            {
                upNote.ExpectedCompletion = note.expectedCompletion.Value;
            }

            upNote.UpdatedBy = note.updatedBy;

            _context.Entry(upNote).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

                var user = await _context.Users.FindAsync(note.updatedBy);
                if (user == null)
                {
                    return BadRequest(new { Message = "No user found." });
                }

                var interaction = new ClientInteraction
                {
                    Note = upNote,
                    User = user,
                    InteractionTime = DateTime.Now
                };

                _context.ClientInteractions.Add(interaction);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoteExists(note.noteID))
                {
                    return NotFound(new { Message = "Note no longer exists." });
                }
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while updating the note.");
            }
            catch (Exception ex)
            {
                
                return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error occurred.");
            }

            return Ok(new { Message = "Note updated successfully." });
        }


        // POST: api/Notes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Note>> PostNote([FromBody] NoteDto note)
        {
            if (note == null)
            {
                return BadRequest(new { Message = "Invalid note data." });
            }

            var n = new Note
            {
                Title = note.title,
                CreatedBy = note.createdBy,
                Summary = note.summary,
                ExpectedCompletion = note.expectedCompletion,
                CreatedFor = note.createdFor
            };

            _context.Notes.Add(n);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = $"An error occurred while saving the note: {ex.Message}" });
            }

            var user = await _context.Users.FindAsync(note.createdBy);
            if (user == null)
            {
                return BadRequest(new { Message = "User not found." });
            }

            var interaction = new ClientInteraction
            {
                Note = n,
                User = user,
                InteractionTime = DateTime.Now
            };

            _context.ClientInteractions.Add(interaction);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = $"An error occurred while saving the interaction: {ex.Message}" });
            }

            return Ok(new {Message  = "Note Created" });
        }


        private bool NoteExists(int id)
        {
            return _context.Notes.Any(e => e.NoteID == id);
        }
    }
}
