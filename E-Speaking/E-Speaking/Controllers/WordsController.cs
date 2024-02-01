﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using E_Speaking.Data;
using E_Speaking.Models;
using NuGet.Versioning;

namespace E_Speaking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WordsController : ControllerBase
    {
        private readonly E_SpeakingContext _context;

        public WordsController(E_SpeakingContext context)
        {
            _context = context;
        }

        // GET: api/Words
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Word>>> GetWord()
        {
            return await _context.Word.Include(x=>x.Difficulty).ToListAsync();
        }

        // GET: api/Words/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Word>> GetWord(int id)
        {
            var word = await _context.Word.Include(x => x.Difficulty).FirstOrDefaultAsync(x => x.Id == id);

            if (word == null)
            {
                return NotFound();
            }

            return word;
        }

        // PUT: api/Words/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWord(int id, Word word)
        {
            if (id != word.Id)
            {
                return BadRequest();
            }
           
            _context.Entry(word).State = EntityState.Modified;

            try
            {
                var wl = await _context.Word_Lesson.Where(x => x.WordId == id).FirstAsync();
                wl.DifficultyId = word.DifficultyId;

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WordExists(id))
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

        // POST: api/Words
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Word>> PostWord(Word word)
        {
            Word_Lesson wl = new Word_Lesson();
            wl.DifficultyId = word.DifficultyId;
            _context.Word.Add(word);
            await _context.SaveChangesAsync();
            wl.WordId = word.Id;
            _context.Word_Lesson.Add(wl);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWord", new { id = word.Id }, word);
        }

        // DELETE: api/Words/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWord(int id)
        {
            var word = await _context.Word.FindAsync(id);
            if (word == null)
            {
                return NotFound();
            }
            var wl = await _context.Word_Lesson.Where(x => x.WordId == id).FirstAsync();
            _context.Word_Lesson.Remove(wl);
            _context.Word.Remove(word);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WordExists(int id)
        {
            return _context.Word.Any(e => e.Id == id);
        }
    }
}
