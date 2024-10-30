using Backend.Models;

namespace Backend.Dtos
{
    public class CustomerListDto
    {
        public int CID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Company { get; set; }

        public string Position { get; set; }

        public string Address { get; set; }

        public string createdBy { get; set; }

        public CustomerStatus Status { get; set; }

        public  DateTime createdAt { get; set; }

    }
}
