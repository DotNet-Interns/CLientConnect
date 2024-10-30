using Backend.Models;

namespace Backend.Dtos
{
    public class CustomerListDto
    {
        public int CID { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }

        public required string Company { get; set; }

        public required string Position { get; set; }

        public required string Address { get; set; }

        public required string createdBy { get; set; }

        public CustomerStatus Status { get; set; }

        public  DateTime createdAt { get; set; }

    }
}
