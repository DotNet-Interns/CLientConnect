using Backend.Controllers;
using Backend.Models;

namespace Backend.Dtos
{
    public class CustomerDto
    {
        public int CID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Company { get; set; }

        public string Position { get; set; }

        public string Address { get; set; }

        public CustomerStatus Status { get; set; }

        public List<PhoneDto> PhoneNumbers { get; set; }
        public List<EmailDto> Emails { get; set; }
    }
}
