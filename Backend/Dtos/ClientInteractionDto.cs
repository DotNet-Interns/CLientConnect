namespace Backend.Dtos
{
    public class ClientInteractionDto
    {
        public int CIID { get; set; }
        public int NoteId { get; set; }
        public int UserId { get; set; }
        public DateTime InteractionTime { get; set; }
    }
}
