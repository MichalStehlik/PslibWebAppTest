using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PslibWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationController : ControllerBase
    {
        [HttpGet("version")]
        public string GetVersion()
        {
            System.Reflection.Assembly executingAssembly = System.Reflection.Assembly.GetExecutingAssembly();
            return executingAssembly.GetName().Version.ToString();
        }

        [HttpGet("name")]
        public string GetName()
        {
            System.Reflection.Assembly executingAssembly = System.Reflection.Assembly.GetExecutingAssembly();
            return executingAssembly.GetName().Name.ToString();
        }
    }
}
