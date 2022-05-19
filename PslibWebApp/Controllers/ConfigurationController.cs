using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace PslibWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfigurationController : ControllerBase
    {
        public ClientConfigurationOptions _options { get; }
        private ILogger<UsersController> _logger;

        public ConfigurationController(IOptions<ClientConfigurationOptions> options, ILogger<UsersController> logger)
        {
            _options = options.Value;
            _logger = logger;
        }

        [HttpGet()]
        public ActionResult GetClient()
        {
            _logger.LogInformation("Client configuration read");
            return Ok(_options);
        }
    }

    public class ClientConfigurationOptions
    {
        public string authority { get; set; }
        public string client_id { get; set; }
        public string redirect_uri { get; set; }
        public string response_type { get; set; }
        public string scope { get; set; }
        public string silent_redirect_uri { get; set; }
        public string post_logout_redirect_uri { get; set; }
        public string automaticSilentRenew { get; set; }
        public string loadUserInfo { get; set; }
        public string webAuthResponseType { get; set; }
    }
}
