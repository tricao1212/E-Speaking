using E_Speaking.Data;
using E_Speaking.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Speaking.Controllers
{
    [Route("api/Words/[controller]")]
    [ApiController]
    public class WordByDiff : ControllerBase
    {
        private readonly E_SpeakingContext _context;

        public WordByDiff(E_SpeakingContext context)
        {
            _context = context;
        }

        [HttpGet("{difid}")]
        public async Task<ActionResult<List<Word>>> GetWordByDiff(int difid)
        {

            var word = await _context.Word.Where(x => x.DifficultyId == difid).ToListAsync();

            if (word == null)
            {
                return NotFound();
            }

            return word;
        }
    }
}
