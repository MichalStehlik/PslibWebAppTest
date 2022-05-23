using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PslibWebApp.InputModels;
using PslibWebApp.Models;
using PslibWebApp.Services;

namespace PslibWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserRepository _repo;
        private readonly ILogger<UsersController> _logger;

        public UsersController(UserRepository repo, ILogger<UsersController> logger)
        {
            _repo = repo;
            _logger = logger;
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
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _repo.GetAsync(id);

            if (user == null)
            {
                _logger.LogError("User " + id + " does not exists. ");
                return NotFound("User " + id + " does not exists. ");
            }

            return user;
        }

        [HttpGet("guid/{id}")]
        public async Task<ActionResult<User>> GetUserByGuid(Guid id)
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
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest("Data content and Id does not match.");
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
        public async Task<IActionResult> DeleteUser(int id)
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
        public async Task<ActionResult<User>> PatchUser(int id, [FromBody] JsonPatchDocument<User> patch)
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

        private bool UserExists(int id)
        {
            return (_repo.DbSet.Any(e => e.Id == id));
        }
    }
}
