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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<CustomerListDto>>> GetCustomers()
        {
            try
            {
                var customerList = await _context.Customers.ToListAsync();

                if (customerList == null || !customerList.Any())
                {
                    return NoContent(); // No customers found
                }

                var result = customerList.Select(item => new CustomerListDto
                {
                    CID = item.CID,
                    FirstName = item.FirstName,
                    LastName = item.LastName,
                    Company = item.Company,
                    Position = item.Position,
                    Address = item.Address,
                    Status = item.Status,
                    createdBy = _context.Users
                        .Where(u => u.UserID == item.CreatedBy)
                        .Select(u => u.FirstName + " " + u.LastName)
                        .FirstOrDefault() ?? "Null Data",
                    createdAt = item.CreatedAt
                }).ToList();

                return Ok(result); // Return the list of customers
            }
            catch (Exception ex)
            {
               // _logger.LogError(ex, "An error occurred while retrieving customers.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An internal server error occurred."); // Handle unexpected errors
            }
        }


        // GET: api/Customers/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<CustomerDto>> GetCustomer(int id)
        {
            try
            {
                var customer = await _context.Customers.FindAsync(id);

                if (customer == null)
                {
                    return NotFound(new { Message = "Customer not found." });
                }

                var phones = await _context.Phones.Where(p => p.CID == id).ToListAsync();
                var emails = await _context.Emails.Where(e => e.CID == id).ToListAsync();

                var customerPhones = phones.Select(item => new PhoneDto
                {
                    phone = item.PhoneNumber,
                    pid = item.PID
                }).ToList();

                var customerEmails = emails.Select(item => new EmailDto
                {
                    email = item.EmailAddress,
                    eid = item.EID
                }).ToList();

                var customerDto = new CustomerDto
                {
                    CID = customer.CID,
                    FirstName = customer.FirstName,
                    LastName = customer.LastName,
                    Company = customer.Company,
                    Position = customer.Position,
                    Status = customer.Status,
                    PhoneNumbers = customerPhones,
                    Emails = customerEmails,
                    Address = customer.Address
                };

                return Ok(customerDto); // Return the customer DTO
            }
            catch (Exception ex)
            {
               // _logger.LogError(ex, "An error occurred while retrieving customer with ID: {Id}", id);
                return StatusCode(StatusCodes.Status500InternalServerError, "An internal server error occurred."); // Handle unexpected errors
            }
        }


        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> PutCustomer(int id, [FromBody] CustomerUpdateDto customer)
        {
            if (customer == null)
            {
                return BadRequest("Customer data is required.");
            }

            var updatedCustomer = await _context.Customers.FindAsync(id);

            if (updatedCustomer == null)
            {
                return NotFound(new { Message = "Customer not found." });
            }

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
            catch (DbUpdateConcurrencyException ex)
            {
                if (!CustomerExists(id))
                {
                    return NotFound(new { Message = "Customer not found during update." });
                }
                else
                {
                    //_logger.LogError(ex, "Concurrency error occurred while updating customer with ID: {Id}", id);
                    return StatusCode(StatusCodes.Status500InternalServerError, "An internal server error occurred.");
                }
            }

            return NoContent(); // Successfully updated
        }

        // POST: api/Customers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // POST: api/Customers
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> PostCustomer([FromBody] RegisterCustomerDto registerCustomer)
        {
            if (registerCustomer == null)
            {
                return BadRequest("Customer registration data is required.");
            }

            try
            {
                Payload userPayload = _jwtTokenService.GetJwtPayload(_httpContextAccessor.HttpContext!);

                // Create new customer instance
                var customer = new Customer
                {
                    FirstName = registerCustomer.FirstName,
                    LastName = registerCustomer.LastName,
                    Address = registerCustomer.Address,
                    Company = registerCustomer.Company,
                    CreatedBy = Int32.Parse(userPayload.UserId),
                    Position = registerCustomer.Position,
                    PhoneNumbers = new List<Phone>(), // Initialize PhoneNumbers collection
                    Emails = new List<Email>() // Initialize Emails collection
                };

                // Add phone and email
                if (!string.IsNullOrEmpty(registerCustomer.PhoneNumber))
                {
                    customer.PhoneNumbers.Add(new Phone { PhoneNumber = registerCustomer.PhoneNumber });
                }

                if (!string.IsNullOrEmpty(registerCustomer.Email))
                {
                    customer.Emails.Add(new Email { EmailAddress = registerCustomer.Email });
                }

                _context.Customers.Add(customer);
                await _context.SaveChangesAsync();

                return Created();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An internal server error occurred while saving the customer.");
            }
        }

        // PUT: api/Customers/toggleStatus/5
        [HttpPut("toggleStatus/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ToggleCustomerStatus(int id)
        {
            try
            {
                var customer = await _context.Customers.FindAsync(id);
                if (customer == null)
                {
                    return NotFound(new { Message = "Customer not found." });
                }

                // Toggle the status
                customer.Status = customer.Status == CustomerStatus.Inactive ? CustomerStatus.Active : CustomerStatus.Inactive;

                _context.Entry(customer).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(new { Message = "Customer status updated successfully.", Status = customer.Status });
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An internal server error occurred while updating the customer status.");
            }
        }


        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.CID == id);
        }
    }
}
