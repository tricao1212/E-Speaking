using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using E_Speaking.Data;
using E_Speaking.Models;
using System.Drawing;

namespace E_Speaking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProcessesController : ControllerBase
    {
        private readonly E_SpeakingContext _context;

        public ProcessesController(E_SpeakingContext context)
        {
            _context = context;
        }

        // GET: api/Processes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Process>>> GetProcess()
        {
            return await _context.Process.ToListAsync();
        }

        // GET: api/Processes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Process>> GetProcess(int id)
        {
            var process = await _context.Process.FindAsync(id);

            if (process == null)
            {
                return NotFound();
            }

            return process;
        }

        // PUT: api/Processes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProcess(int id, Process process)
        {
            if (id != process.Id)
            {
                return BadRequest();
            }
            process.AttemptTime = DateTime.Now;
            _context.Entry(process).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProcessExists(id))
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

        // POST: api/Processes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Process>> PostProcess(Process process)
        {
            var user = await _context.User.FirstOrDefaultAsync(x => x.UID.Equals(process.UserUID));
            var p = await _context.Process.FirstOrDefaultAsync(x => x.LessonId == process.LessonId && x.UserUID.Equals(process.UserUID) && x.Type.Equals(process.Type));
            var level = await _context.Level.OrderBy(x => x.RangePoint).ToListAsync();
            if (p != null)
            {
                if (p.Progress < process.Progress)
                {
                    int temp = process.Progress - p.Progress;
                    p.Progress = process.Progress;
                    user.Point += temp;
                    for (int i = 1; i < level.Count; i++)
                    {
                        if (user.Point >= level[i].RangePoint)
                        {
                            user.LevelId = level[i].Id;
                        }
                    }
                    p.AttemptTime = DateTime.Now;
                    _context.Process.Update(p);
                }
            }
            else
            {
                user.Point += process.Progress;
                for (int i = 0; i < level.Count; i++)
                {
                    if (user.Point >= level[i].RangePoint)
                    {
                        user.LevelId = level[i].Id;
                    }
                }
                process.AttemptTime = DateTime.Now;
                _context.Process.Add(process);
            }
            _context.User.Update(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProcess", new { id = process.Id }, process);
        }
        private bool ProcessExists(int id)
        {
            return _context.Process.Any(e => e.Id == id);
        }

    }
}
