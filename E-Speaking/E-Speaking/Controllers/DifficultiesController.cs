﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using E_Speaking.Data;
using E_Speaking.Models;

namespace E_Speaking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DifficultiesController : ControllerBase
    {
        private readonly E_SpeakingContext _context;

        public DifficultiesController(E_SpeakingContext context)
        {
            _context = context;
        }

        // GET: api/Difficulties
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Difficulty>>> GetDifficulty()
        {
            return await _context.Difficulty.ToListAsync();
        }

        // GET: api/Difficulties/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Difficulty>> GetDifficulty(int id)
        {
            var difficulty = await _context.Difficulty.FirstOrDefaultAsync(m => m.Id == id);

            if (difficulty == null)
            {
                return NotFound();
            }

            return difficulty;
        }

        // PUT: api/Difficulties/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDifficulty(int id, Difficulty difficulty)
        {
            if (id != difficulty.Id)
            {
                return BadRequest();
            }

            _context.Entry(difficulty).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DifficultyExists(id))
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

        // POST: api/Difficulties
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Difficulty>> PostDifficulty(Difficulty difficulty)
        {
            _context.Difficulty.Add(difficulty);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDifficulty", new { id = difficulty.Id }, difficulty);
        }

        // DELETE: api/Difficulties/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDifficulty(int id)
        {
            var difficulty = await _context.Difficulty.FindAsync(id);
            if (difficulty == null)
            {
                return NotFound();
            }

            _context.Difficulty.Remove(difficulty);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DifficultyExists(int id)
        {
            return _context.Difficulty.Any(e => e.Id == id);
        }
    }
}
