using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    public class RecentNoteDto
    {
        public int NoteID { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public NoteStatus Status { get; set; }
        public DateTime ExpectedCompletion { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public string CreatedFor { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class AdminDashboardDto
    {
        public int totalCustomer { get; set; }
        public int activeCustomers { get; set; }
        public int inactiveCustomers { get; set; }
        public int recentInteraction { get; set; }
        public int totalSalesReps { get; set; }
        public int pendingNotes { get; set; }
        public int CompletedNotesThisMonth { get; set; }
        public List<RecentNoteDto> recentNotes { get; set; }
    }

    public class SRDashboardDto
    {
        public int totalCustomer { get; set; }
        public int activeCustomers { get; set; }
        public int inactiveCustomers { get; set; }
        public int recentInteraction { get; set; }
        public int customersCreatedByYou { get; set; }
        public int customerInteractionsThisMonths { get; set; }
        public int CompletedNotesThisMonth { get; set; }
        public List<RecentNoteDto> recentNotes { get; set; }
    }


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

            AdminDashboardDto adto = new AdminDashboardDto();

            adto.activeCustomers = await _context.Customers.CountAsync(c => c.Status == CustomerStatus.Active);
            adto.inactiveCustomers = await _context.Customers.CountAsync(c => c.Status == CustomerStatus.Inactive);

            adto.totalCustomer = adto.activeCustomers + adto.inactiveCustomers;

            adto.totalSalesReps = await _context.Users.CountAsync(u => u.Role == UserRole.SalesRepresentative && u.Status == UserStatus.Active);
            adto.pendingNotes = await _context.Notes.CountAsync(n => n.Status == NoteStatus.Pending);
            adto.CompletedNotesThisMonth = await _context.Notes.CountAsync(n => n.Status == NoteStatus.Completed && n.CreatedAt >= startOfMonth && n.CreatedAt <= DateTime.Now);

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
                        .Where(u => u.UserID == note.CreatedBy).Select(u => u.FirstName + " " + u.LastName).FirstOrDefault(),
                    UpdatedBy = _context.Users
                        .Where(u => u.UserID == note.UpdatedBy).Select(u => u.FirstName + " " + u.LastName).FirstOrDefault(),
                    CreatedFor = _context.Users
                        .Where(u => u.UserID == note.CreatedFor)
                        .Select(u => u.FirstName + " " + u.LastName)
                        .FirstOrDefault(),
                    CreatedAt = note.CreatedAt
                })
                .ToListAsync();

            return adto;
        }


        [HttpGet("SR/{UserId}")]
        public async Task<ActionResult<SRDashboardDto>> SRDashboard(int UserId)
        {
            var startOfMonth = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);

            SRDashboardDto srdto = new SRDashboardDto();

            srdto.activeCustomers = await _context.Customers.CountAsync(c => c.Status == CustomerStatus.Active);
            srdto.inactiveCustomers = await _context.Customers.CountAsync(c => c.Status == CustomerStatus.Inactive);

            srdto.totalCustomer = srdto.activeCustomers + srdto.inactiveCustomers;

            srdto.customersCreatedByYou = await _context.Customers.CountAsync(c => c.CreatedBy == UserId);


            srdto.CompletedNotesThisMonth = await _context.Notes.CountAsync(n => n.Status == NoteStatus.Completed && n.CreatedAt >= startOfMonth && n.CreatedAt <= DateTime.Now && n.CreatedBy == UserId);

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
                       .Where(u => u.UserID == note.CreatedBy).Select(u => u.FirstName + " " + u.LastName).FirstOrDefault(),
                   UpdatedBy = _context.Users
                       .Where(u => u.UserID == note.UpdatedBy).Select(u => u.FirstName + " " + u.LastName).FirstOrDefault(),
                   CreatedFor = _context.Users
                       .Where(u => u.UserID == note.CreatedFor)
                       .Select(u => u.FirstName + " " + u.LastName)
                       .FirstOrDefault(),
                   CreatedAt = note.CreatedAt
               })
               .ToListAsync();

            return srdto;
        }

    }
}
