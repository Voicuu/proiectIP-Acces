using Microsoft.AspNetCore.Mvc;
using System;
using System.Windows.Forms;

namespace proiectIP.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AngajatController : ControllerBase
    {
        private static MainPage _mainPage; // Reference to the MainPage instance

        public AngajatController(MainPage mainPage)
        {
            _mainPage = mainPage;
        }

        [HttpPost]
        public IActionResult PostAngajat([FromBody] Angajat angajat)
        {
            try
            {
                _mainPage.Invoke(new Action(() => _mainPage.UpdateangajatDetails(angajat)));
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
