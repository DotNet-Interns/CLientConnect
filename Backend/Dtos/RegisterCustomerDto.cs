namespace Backend.Dtos
{
    public class RegisterCustomerDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }

        public string Company { get; set; }
        public int CreatedBy { get; set; }
        public string Position { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
    }
}
