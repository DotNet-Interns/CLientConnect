using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Services;
using Backend.Dtos;

namespace Backend.Controllers
{
  
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
                Status = customer.Status,
                PhoneNumbers = customerPhones ,
                Emails = customerEmails,
                Address = customer.Address
            };

            return customerDto;
        }


        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut()]
        public async Task<IActionResult> PutCustomer( [FromBody] CustomerUpdateDto customer)
        {
           
            Customer updatedCustomer = await _context.Customers.FindAsync(customer.cid);

            updatedCustomer.FirstName = customer.firstName ?? updatedCustomer.FirstName;
            updatedCustomer.LastName = customer.lastName ?? updatedCustomer.LastName;
            updatedCustomer.Address = customer.address ?? updatedCustomer.Address;
            updatedCustomer.Company = customer.company ?? updatedCustomer.Company;
            updatedCustomer.Position = customer.position ?? updatedCustomer.Position;

            _context.Entry(updatedCustomer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(customer.cid))
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
        public async Task<ActionResult> PostCustomer([FromBody] RegisterCustomerDto registerCustomer)
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
        [HttpPut("toggleStatus/{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            
            
            Customer customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }
            if(customer.Status == CustomerStatus.Inactive)
            {
                customer.Status = CustomerStatus.Active;
            }
            else
            {
                customer.Status = CustomerStatus.Inactive;
            }
            
            

            _context.Entry(customer).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.CID == id);
        }
    }
}
