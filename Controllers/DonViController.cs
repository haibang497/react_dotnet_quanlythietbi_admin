using Microsoft.AspNetCore.Mvc;
using QuanLyThietBi.Models;

namespace QuanLyThietBi.Controllers
{
    public class DonViController : ControllerBase
    {
        private ApplicationContext _context { get; set; }

        public DonViController(ApplicationContext context)
        {
            _context = context;
        }


    }
}