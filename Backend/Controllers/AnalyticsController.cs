using Backend.Models;
using Microsoft.AspNetCore.Components.Forms.Mapping;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;

namespace Backend.Controllers
{
    public class AdminDashboardDto
    {
        public int totalCustomer { get; set; }

        public int activeCustomers { get; set; }


        public int inactiveCustomers { get; set; }
        public int recentInteraction { get; set; }

        public int totalSalesReps { get; set; }

        public int pendingNotes { get; set; }
        public int CompletedNotesThisMonth { get; set; }


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
            AdminDashboardDto adto = new AdminDashboardDto();
             adto.activeCustomers = _context.Customers.Count(c => c.Status== CustomerStatus.Active);
             adto.inactiveCustomers = _context.Customers.Count(c => c.Status == CustomerStatus.Inactive); ;

            adto.totalCustomer = adto.activeCustomers + adto.inactiveCustomers;

            adto.totalSalesReps = _context.Users.Count(u => u.Role == UserRole.SalesRepresentative && u.Status == UserStatus.Active);

            adto.pendingNotes = _context.Notes.Count(n => n.Status == NoteStatus.Pending);

            var startOfMonth = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);

            adto.CompletedNotesThisMonth = _context.Notes.Count(n => n.Status == NoteStatus.Completed && n.CreatedAt >= startOfMonth && n.CreatedAt <= DateTime.Now);

            return adto;
        }

    }
}
