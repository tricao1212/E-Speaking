using System;
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
    public class SentencesController : ControllerBase
    {
        private readonly E_SpeakingContext _context;

        public SentencesController(E_SpeakingContext context)
        {
            _context = context;
        }

        // GET: api/Sentences
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sentence>>> GetSentence()
        {
          if (_context.Sentence == null)
          {
              return NotFound();
          }
            return await _context.Sentence.Include(x=>x.Lesson).ToListAsync();
        }

        // GET: api/Sentences/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sentence>> GetSentence(int id)
        {
          if (_context.Sentence == null)
          {
              return NotFound();
          }
            var sentence = await _context.Sentence.Include(x => x.Lesson).FirstOrDefaultAsync(x => x.Id == id);

            if (sentence == null)
            {
                return NotFound();
            }
            return sentence;
        }

        // PUT: api/Sentences/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSentence(int id, Sentence sentence)
        {
            if (id != sentence.Id)
            {
                return BadRequest();
            }

            _context.Entry(sentence).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SentenceExists(id))
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

        // POST: api/Sentences
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Sentence>> PostSentence(Sentence sentence)
        {
          if (_context.Sentence == null)
          {
              return Problem("Entity set 'E_SpeakingContext.Sentence'  is null.");
          }
            _context.Sentence.Add(sentence);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSentence", new { id = sentence.Id }, sentence);
        }

        // DELETE: api/Sentences/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSentence(int id)
        {
            if (_context.Sentence == null)
            {
                return NotFound();
            }
            var sentence = await _context.Sentence.FindAsync(id);
            if (sentence == null)
            {
                return NotFound();
            }

            _context.Sentence.Remove(sentence);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SentenceExists(int id)
        {
            return (_context.Sentence?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
