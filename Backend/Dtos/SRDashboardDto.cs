namespace Backend.Dtos
{
    public class SRDashboardDto
    {
        public int totalCustomer { get; set; }
        public int activeCustomers { get; set; }
        public int inactiveCustomers { get; set; }
        public int recentInteraction { get; set; }
        public int pendingNotes { get; set; }
        public int customersCreatedByYou { get; set; }

        public int pendingNotes { get; set; }
        public int customerInteractionsThisMonths { get; set; }
        public int CompletedNotesThisMonth { get; set; }
        public List<RecentNoteDto> recentNotes { get; set; }
    }
}
