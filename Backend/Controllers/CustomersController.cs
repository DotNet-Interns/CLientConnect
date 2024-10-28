using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Services;

namespace Backend.Controllers
{
    public class CustomerDto
    {
        public int CID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Company { get; set; }

        public string Position { get; set; }

        public string Address { get; set; }

        public List<PhoneDto> PhoneNumbers { get; set; }
        public List<EmailDto> Emails { get; set; }
    }

    public class PhoneDto
    {
        public int pid { get; set; }
        public string phone { get; set; }
    }

    public class EmailDto
    {
        public int eid { get; set; }
        public string email { get; set; }
    }

    public class RegisterCustomer 
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
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ClientConnectContext _context;
        private readonly JwtTokenService _jwtTokenService ;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CustomersController(ClientConnectContext context , JwtTokenService jwtTokenService,IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _jwtTokenService = jwtTokenService;
            _httpContextAccessor = httpContextAccessor;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            return await _context.Customers.ToListAsync();
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerDto>> GetCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            List<int> notes = await _context.Notes.Where(n => n.CreatedFor == id).Select(n=> n.NoteID).ToListAsync();
            List<string> phones = await _context.Phones.Where(p => p.CID == id).Select(p=>p.PhoneNumber).ToListAsync();
            List<string> emails = await _context.Emails.Where(p => p.CID == id).Select(e=>e.email).ToListAsync();

            List<Phone> phone = await _context.Phones.Where(p => p.CID == id).ToListAsync();
            List<Email> email = await _context.Emails.Where(e => e.CID == id).ToListAsync();

            List<PhoneDto> customerPhones = [];
            List<EmailDto> customerEmails = [];
            foreach (var item in phone)
            {
                PhoneDto currPhone = new PhoneDto();
                currPhone.phone = item.PhoneNumber;
                currPhone.pid = item.PID;

                customerPhones.Add(currPhone);

            }

            foreach (var item in email)
            {
               EmailDto currEmail = new EmailDto();
                currEmail.email = item.email;
                currEmail.eid = item.EID;

                customerEmails.Add(currEmail);

            }




            var customerDto = new CustomerDto
            {
                CID = customer.CID,
                FirstName = customer.FirstName,
                LastName = customer.LastName,
                Company = customer.Company,
                Position = customer.Position,
                PhoneNumbers = customerPhones ,
                Emails = customerEmails,
                Address = customer.Address
            };

            return customerDto;
        }


        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer customer)
        {
            if (id != customer.CID)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Customers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult> PostCustomer([FromBody] RegisterCustomer registerCustomer)
        {
            Payload userPayload = _jwtTokenService.GetJwtPayload(_httpContextAccessor.HttpContext!);
            
            Customer customer = new Customer();
            customer.FirstName = registerCustomer.FirstName;
            customer.LastName = registerCustomer.LastName;
            customer.Address = registerCustomer.Address;
            customer.Company = registerCustomer.Company;
            customer.CreatedBy = Int32.Parse(userPayload.UserId);

            customer.Position = registerCustomer.Position;

            Phone phone = new Phone();
            phone.PhoneNumber = registerCustomer.PhoneNumber;
            customer.PhoneNumbers.Add(phone);

            Email email = new Email();
            email.email = registerCustomer.Email;
            customer.Emails.Add(email);

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return Created();      
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.CID == id);
        }
    }
}
