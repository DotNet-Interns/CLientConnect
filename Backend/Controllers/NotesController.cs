using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Dtos;
using Microsoft.VisualBasic;

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

        public ClientConnectContext Get_context()
        {
            return _context;
        }

        // GET: api/Notes
        [HttpGet("userNotes/{id}")]
        public async Task<ActionResult<IEnumerable<GetNoteDto>>> GetNotes(int id, ClientConnectContext _context)
        {
            return await _context.Notes
                  .Where(n => n.CreatedFor == id)
                  .Select(async note => new GetNoteDto
                  {
                      noteID = note.NoteID,
                      title = note.Title,
                      summary = note.Summary,
                      status = note.Status,
                      expectedCompletion = note.ExpectedCompletion,
                      createdBy = _context.Users
                          .Where(u => u.UserID == note.CreatedBy).Select(u => u.FirstName + " " + u.LastName).FirstOrDefault(),
                      updatedBy = _context.Users
                          .Where(u => u.UserID == note.UpdatedBy).Select(u => u.FirstName + " " + u.LastName).FirstOrDefault(),
    //                   interactions = await _context.clientInteractions
    //.Where(i => i.NoteId == note.NoteID)
    //.Select(i => new ClientInteractionDto
    //{
    //    NoteId = i.NoteId,
    //    UserId = i.UserId,
    //    InteractionTime = i.InteractionTime
    //})
    //.ToListAsync();



                      createdAt = note.CreatedAt
                  })
                .ToListAsync();
        }

        

        // PUT: api/Notes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [ProducesResponseType(statusCode:StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutNote(int id, Note note)
        {
            if (id != note.NoteID)
            {
                return BadRequest();
            }

            _context.Entry(note).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

                var interaction = new ClientInteraction
                {
                    NoteId = note.NoteID, 
                    UserId = note.CreatedBy,
                    InteractionTime = DateTime.Now 
                };

                _context.clientInteractions.Add(interaction);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoteExists(id))
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

        // POST: api/Notes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Note>> PostNote(NoteDto note)
        {
            Console.WriteLine($"Title: {note.title}");
            Console.WriteLine($"Created By: {note.createdBy}");
            Console.WriteLine($"Summary: {note.summary}");
            Console.WriteLine($"Expected Completion: {note.expectedCompletion}");
            Console.WriteLine($"Created For: {note.createdFor}");

            Note n = new Note();
            n.Title = note.title;
            n.CreatedBy = note.createdBy;
            n.Summary = note.summary;

            n.ExpectedCompletion = note.expectedCompletion;
            n.CreatedFor = note.createdFor;
            
            _context.Notes.Add(n);
            await _context.SaveChangesAsync();

            
            //var interaction = new ClientInteraction
            //{
            //    NoteId = note.noteID, 
            //    UserId = note.createdBy, 
            //    InteractionTime = DateTime.Now
            //};

            //_context.clientInteractions.Add(interaction);
            //await _context.SaveChangesAsync();


            return CreatedAtAction("GetNote", new { id = note.noteID }, note);
        }

        private bool NoteExists(int id)
        {
            return _context.Notes.Any(e => e.NoteID == id);
        }
    }
}
