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
    public class Word_LessonController : ControllerBase
    {
        private readonly E_SpeakingContext _context;

        public Word_LessonController(E_SpeakingContext context)
        {
            _context = context;
        }

        // GET: api/Word_Lesson
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Word_Lesson>>> GetWord_Lesson()
        {
            return await _context.Word_Lesson.ToListAsync();
        }

        // GET: api/Word_Lesson/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Word_Lesson>> GetWord_Lesson(int id)
        {
            var word_Lesson = await _context.Word_Lesson.FindAsync(id);

            if (word_Lesson == null)
            {
                return NotFound();
            }

            return word_Lesson;
        }

        // PUT: api/Word_Lesson/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWord_Lesson(int id, Word_Lesson word_Lesson)
        {
            if (id != word_Lesson.Id)
            {
                return BadRequest();
            }

            _context.Entry(word_Lesson).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Word_LessonExists(id))
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

        // POST: api/Word_Lesson
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Word_Lesson>> PostWord_Lesson(Word_Lesson word_Lesson)
        {
            _context.Word_Lesson.Add(word_Lesson);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWord_Lesson", new { id = word_Lesson.Id }, word_Lesson);
        }

        // DELETE: api/Word_Lesson/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWord_Lesson(int id)
        {
            var word_Lesson = await _context.Word_Lesson.FindAsync(id);
            if (word_Lesson == null)
            {
                return NotFound();
            }

            _context.Word_Lesson.Remove(word_Lesson);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Word_LessonExists(int id)
        {
            return _context.Word_Lesson.Any(e => e.Id == id);
        }
    }
}
