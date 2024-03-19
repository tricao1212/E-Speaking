using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using E_Speaking.Data;
using E_Speaking.Models;
using System.Text.Json;

namespace E_Speaking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly E_SpeakingContext _context;

        public AuthController(E_SpeakingContext context)
        {
            _context = context;
        }

        // GET: api/Auth
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            return await _context.User.Include(x => x.Processes).Include(x=>x.Level).ToListAsync();
        }

        // GET: api/Auth/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            var user = await _context.User.Include(x=>x.Processes).Include(x=>x.Level).FirstOrDefaultAsync(x=>x.UID.Equals(id));

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }


        // POST: api/Auth
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            var newUser = await _context.User.FirstOrDefaultAsync(x=>x.UID.Equals(user.UID));
            if (newUser == null)
            {
                newUser = new User
                {
                    UID = user.UID,
                    Email = user.Email,
                    Avatar = user.Avatar,
                    Name = user.Name,
                    Role = 2,
                    LevelId = 1,
                    Point = 0
                };
                _context.User.Add(newUser);
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.UID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return newUser;
        }
        // PUT: api/Levels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(string id, User user)
        {
            if (id != user.UID)
            {
                return BadRequest();
            }
            _context.Entry(user).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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
        private bool UserExists(string id)
        {
            return _context.User.Any(e => e.UID == id);
        }
    }
}
