using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class RegisterController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
