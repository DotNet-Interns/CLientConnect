namespace Backend.Dtos
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
        public List<RecentNoteDto> recentNotes { get; set; }
    }
}
