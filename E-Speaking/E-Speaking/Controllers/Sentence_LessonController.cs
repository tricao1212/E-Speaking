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
    public class Sentence_LessonController : ControllerBase
    {
        private readonly E_SpeakingContext _context;

        public Sentence_LessonController(E_SpeakingContext context)
        {
            _context = context;
        }

        // GET: api/Sentence_Lesson
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sentence_Lesson>>> GetSentence_Lesson()
        {
            return await _context.Sentence_Lesson.ToListAsync();
        }

        // GET: api/Sentence_Lesson/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sentence_Lesson>> GetSentence_Lesson(int id)
        {
            var sentence_Lesson = await _context.Sentence_Lesson.FindAsync(id);

            if (sentence_Lesson == null)
            {
                return NotFound();
            }

            return sentence_Lesson;
        }

        // PUT: api/Sentence_Lesson/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSentence_Lesson(int id, Sentence_Lesson sentence_Lesson)
        {
            if (id != sentence_Lesson.Id)
            {
                return BadRequest();
            }

            _context.Entry(sentence_Lesson).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Sentence_LessonExists(id))
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

        // POST: api/Sentence_Lesson
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Sentence_Lesson>> PostSentence_Lesson(Sentence_Lesson sentence_Lesson)
        {
            _context.Sentence_Lesson.Add(sentence_Lesson);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSentence_Lesson", new { id = sentence_Lesson.Id }, sentence_Lesson);
        }

        // DELETE: api/Sentence_Lesson/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSentence_Lesson(int id)
        {
            var sentence_Lesson = await _context.Sentence_Lesson.FindAsync(id);
            if (sentence_Lesson == null)
            {
                return NotFound();
            }

            _context.Sentence_Lesson.Remove(sentence_Lesson);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Sentence_LessonExists(int id)
        {
            return _context.Sentence_Lesson.Any(e => e.Id == id);
        }
    }
}
