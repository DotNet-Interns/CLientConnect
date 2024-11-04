using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AnalyticsController : ControllerBase
    {
        private readonly ClientConnectContext _context;

        public AnalyticsController(ClientConnectContext context)
        {
            _context = context;
        }

        [HttpGet("Admin")]
        public async Task<ActionResult<AdminDashboardDto>> AdminDashboard()
        {
            var startOfMonth = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            var dayBefore = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day - 1);
            var adto = new AdminDashboardDto();

            try
            {
                adto.activeCustomers = await _context.Customers.CountAsync(c => c.Status == CustomerStatus.Active);
                adto.inactiveCustomers = await _context.Customers.CountAsync(c => c.Status == CustomerStatus.Inactive);
                adto.totalCustomer = adto.activeCustomers + adto.inactiveCustomers;

                adto.totalSalesReps = await _context.Users.CountAsync(u => u.Role == UserRole.SalesRepresentative && u.Status == UserStatus.Active);
                adto.pendingNotes = await _context.Notes.CountAsync(n => n.Status == NoteStatus.Pending);
                adto.CompletedNotesThisMonth = await _context.Notes.CountAsync(n => n.Status == NoteStatus.Completed && n.CreatedAt >= startOfMonth && n.CreatedAt <= DateTime.Now);

                adto.recentInteraction = await _context.ClientInteractions.CountAsync(i => i.InteractionTime >= dayBefore);

                adto.recentNotes = await _context.Notes
                    .OrderByDescending(n => n.CreatedAt)
                    .Select(note => new RecentNoteDto
                    {
                        NoteID = note.NoteID,
                        Title = note.Title,
                        Summary = note.Summary,
                        Status = note.Status,
                        ExpectedCompletion = note.ExpectedCompletion,
                        CreatedBy = _context.Users
                            .Where(u => u.UserID == note.CreatedBy)
                            .Select(u => u.FirstName + " " + u.LastName)
                            .FirstOrDefault() ?? "Unknown",
                        UpdatedBy = _context.Users
                            .Where(u => u.UserID == note.UpdatedBy)
                            .Select(u => u.FirstName + " " + u.LastName)
                            .FirstOrDefault() ?? "Unknown",
                        CreatedFor = _context.Users
                            .Where(u => u.UserID == note.CreatedFor)
                            .Select(u => u.FirstName + " " + u.LastName)
                            .FirstOrDefault() ?? "Unknown",
                        CreatedAt = note.CreatedAt
                    })
                    .ToListAsync();

                adto.recentNotes = adto.recentNotes.Take(10).ToList(); // Limit to 10 recent notes
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, new { Message = $"An internal server error occurred.{ex}" });
            }

            return Ok(adto); // Return the DTO with a 200 OK status
        }


        [HttpGet("SR/{UserId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<SRDashboardDto>> SRDashboard(int UserId)
        {
            var startOfMonth = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            var dayBefore = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day - 1);
            var srdto = new SRDashboardDto();
            if (!_context.Users.Any(u => u.UserID == UserId)) {

                return BadRequest(new { Message = "No User found" });

            }

            try
            {
                srdto.activeCustomers = await _context.Customers.CountAsync(c => c.Status == CustomerStatus.Active);
                srdto.inactiveCustomers = await _context.Customers.CountAsync(c => c.Status == CustomerStatus.Inactive);
                srdto.totalCustomer = srdto.activeCustomers + srdto.inactiveCustomers;

                srdto.customersCreatedByYou = await _context.Customers.CountAsync(c => c.CreatedBy == UserId);
               srdto.recentInteraction =   await _context.ClientInteractions.CountAsync(i => i.InteractionTime >= dayBefore && i.UserId == UserId);

                srdto.CompletedNotesThisMonth = await _context.Notes.CountAsync(n =>
                    n.Status == NoteStatus.Completed &&
                    n.CreatedAt >= startOfMonth &&
                    n.CreatedAt <= DateTime.Now &&
                    n.CreatedBy == UserId);

                srdto.recentNotes = await _context.Notes
                    .Where(n => n.CreatedBy == UserId)
                    .OrderByDescending(n => n.CreatedAt)
                    .Select(note => new RecentNoteDto
                    {
                        NoteID = note.NoteID,
                        Title = note.Title,
                        Summary = note.Summary,
                        Status = note.Status,
                        ExpectedCompletion = note.ExpectedCompletion,
                        CreatedBy = _context.Users
                            .Where(u => u.UserID == note.CreatedBy)
                            .Select(u => u.FirstName + " " + u.LastName)
                            .FirstOrDefault() ?? "Unknown",
                        UpdatedBy = _context.Users
                            .Where(u => u.UserID == note.UpdatedBy)
                            .Select(u => u.FirstName + " " + u.LastName)
                            .FirstOrDefault() ?? "Unknown",
                        CreatedFor = _context.Users
                            .Where(u => u.UserID == note.CreatedFor)
                            .Select(u => u.FirstName + " " + u.LastName)
                            .FirstOrDefault() ?? "Unknown",
                        CreatedAt = note.CreatedAt
                    })
                    .Take(10) // Limit to 10 recent notes
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                // Log the error (uncomment and configure logger as needed)
                // _logger.LogError(ex, "An error occurred while retrieving the sales representative dashboard data for UserId {UserId}.", UserId);
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = $"An internal server error occurred: {ex.Message}" });
            }

            return Ok(srdto); // Return the DTO with a 200 OK status
        }


    }
}
