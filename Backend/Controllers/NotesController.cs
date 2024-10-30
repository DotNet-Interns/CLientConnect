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

        

        // GET: api/Notes
        [HttpGet("userNotes/{id}")]
        public async Task<ActionResult<IEnumerable<GetNoteDto>>> GetNotes(int id, ClientConnectContext _context)
        {
            return await _context.Notes
                  .Where(n => n.CreatedFor == id)
                  .Select( note => new GetNoteDto
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
                      


                      createdAt = note.CreatedAt
                  })
                .ToListAsync();
        }

        [HttpPut("UpdateNoteStatus/{id}")]
        public async Task<IActionResult> UpdateNoteStatus(int id , [FromBody] UpdateNoteStatusDto upnsdto)
        {
            Note n =  _context.Notes.Find(id);
            Console.WriteLine("current status");
            Console.Write(upnsdto.Status);
            //if(upnsdto.Status)
            if(n == null)
            {
                return BadRequest();
            }
            n.Status = upnsdto.Status;

            Console.WriteLine("current status");
            Console.Write(n.Status);

            _context.Entry(n).State = EntityState.Modified;

            await _context.SaveChangesAsync();


            return Ok();
        }

        // PUT: api/Notes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut()]
        [ProducesResponseType(statusCode:StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutNote([FromBody] UpdateNoteDto note)
        {
            Note upNote = _context.Notes.Find(note.noteID);
            upNote.Summary = note.summary ?? upNote.Summary;
            upNote.Title = note.title ?? upNote.Title;
            upNote.ExpectedCompletion = note.expectedCompletion;

            Console.WriteLine("update note");
            _context.Entry(upNote).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

                User u = _context.Users.Find(note.updatedBy);

                var interaction = new ClientInteraction
                {
                    Note = upNote,
                    User = u,
                    InteractionTime = DateTime.Now
                };

                _context.clientInteractions.Add(interaction);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoteExists(note.noteID))
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
        public async Task<ActionResult<Note>> PostNote([FromBody]NoteDto note)
        {
           

            Note n = new Note();
            n.Title = note.title;
            n.CreatedBy = note.createdBy;
            n.Summary = note.summary;

            n.ExpectedCompletion = note.expectedCompletion;
            n.CreatedFor = note.createdFor;
            
            _context.Notes.Add(n);
            await _context.SaveChangesAsync();


            User u = _context.Users.Find(note.createdBy);

            var interaction = new ClientInteraction
            {
                Note = n,
                User = u,
                InteractionTime = DateTime.Now
            };

           _context.clientInteractions.Add(interaction);
            await _context.SaveChangesAsync();

         
            return Ok();
        }

        private bool NoteExists(int id)
        {
            return _context.Notes.Any(e => e.NoteID == id);
        }
    }
}
