using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class ChiragController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
