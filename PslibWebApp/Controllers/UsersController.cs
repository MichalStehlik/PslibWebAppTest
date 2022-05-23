using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using PslibWebApp.Definitions;
using PslibWebApp.Models;
using PslibWebApp.Services;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Processing;

namespace PslibWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly UserRepository _repo;
        private readonly ILogger<UsersController> _logger;
        public UsersConfigurationOptions _options { get; }
        private readonly IAuthorizationService _authorizationService;

        public UsersController(UserRepository repo, ILogger<UsersController> logger, IOptions<UsersConfigurationOptions> options, IAuthorizationService authorizationService)
        {
            _repo = repo;
            _logger = logger;
            _options = options.Value;
            _authorizationService = authorizationService;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers(
            string? search = null,
            string? firstname = null,
            string? lastname = null,
            string? email = null,
            Gender? gender = null,
            bool? intern = null,
            bool? controller = null,
            string? order = "lastname",
            int page = 0,
            int pagesize = 0
            )
        {
            return await _repo.GetAllAsync(/*filter: (user) => (user.FirstName == "Bobík")*/);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            var user = await _repo.GetAsync(id);

            if (user == null)
            {
                _logger.LogError("User " + id + " does not exists. ");
                return NotFound("User " + id + " does not exists. ");
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(Guid id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest("Data content and Id does not match.");
            }
            var isAdmin = await _authorizationService.AuthorizeAsync(User, AuthorizationConstants.ADMIN_POLICY);
            if (!User.HasClaim(ClaimTypes.NameIdentifier, user.Id.ToString()) && !isAdmin.Succeeded)
            {
                return Unauthorized("only user himself or privileged user can edit user record");
            }

            _repo.Update(user);

            try
            {
                await _repo.SaveAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    _logger.LogError("User " + id + " does not exists.");
                    return NotFound("User " + id + " does not exists. ");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _repo.Insert(user);
            await _repo.SaveAsync();
            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        [Authorize(Policy = AuthorizationConstants.ADMIN_POLICY)]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var user = await _repo.GetAsync(id);
            if (user == null)
            {
                _logger.LogError("User " + id + " does not exists.");
                return NotFound("User " + id + " does not exists. ");
            }

            _repo.Delete(user);
            await _repo.SaveAsync();

            return NoContent();
        }

        // PATCH: api/Users/5
        [HttpPatch]
        public async Task<ActionResult<User>> PatchUser(Guid id, [FromBody] JsonPatchDocument<User> patch)
        {
            var user = await _repo.GetAsync(id);
            if (user == null)
            {
                _logger.LogError("User " + id + " does not exists.");
                return NotFound("User " + id + " does not exists. ");
            }
            if (patch != null)
            {
                patch.ApplyTo(user, ModelState);
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                return new ObjectResult(user);
            }
            else
            {
                return BadRequest(ModelState);
            }           
        }

        [HttpGet("{id}/icon")]
        public async Task<IActionResult> Icon(Guid id)
        {
            var user = await _repo.GetAsync(id);
            if (user != null)
            {
                if (user.IconImage != null && user.IconImageType != null)
                {
                    return File(user.IconImage, user.IconImageType);
                }
                else
                {
                    return NoContent();
                }
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost("{id}/icon")]
        public async Task<IActionResult> UploadImage(Guid id)
        {
            var user = await _repo.GetAsync(id);
            if (user != null && Request.Form.Files.Count == 1)
            {
                var file = Request.Form.Files[0];
                if (file != null && file.Length > 0)
                {
                    try
                    {
                        var size = file.Length;
                        var type = file.ContentType;
                        var filename = file.FileName;
                        MemoryStream ims = new();
                        MemoryStream oms = new();
                        file.CopyTo(ims);

                        using (Image image = Image.Load(ims.ToArray(), out IImageFormat format))
                        {
                            int largestSize = Math.Max(image.Height, image.Width);
                            bool landscape = image.Width > image.Height;
                            int iconSize = _options.IconSize;
                            if (landscape)
                                image.Mutate(x => x.Resize(0, iconSize));
                            else
                                image.Mutate(x => x.Resize(iconSize, 0));
                            image.Mutate(x => x.Crop(new Rectangle((image.Width - iconSize) / 2, (image.Height - iconSize) / 2, iconSize, iconSize)));
                            image.Save(oms, format);
                        }

                        user.IconImage = ims.ToArray();
                        user.IconImageType = type;
                        await _repo.SaveAsync();
                        return Ok();
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "error saving icon");
                        return BadRequest(ex.Message);
                    }
                }
                return BadRequest("file is empty or there is multiple files");
            }
            return BadRequest("there is no file in formData");
        }

        private bool UserExists(Guid id)
        {
            return (_repo.DbSet.Any(e => e.Id == id));
        }
    }

    public class UsersConfigurationOptions
    {
        public int IconSize { get; set; }
    }
}
