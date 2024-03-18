using E_Speaking.Data;
using E_Speaking.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Speaking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PointController : ControllerBase
    {
        private readonly E_SpeakingContext _context;

        public PointController(E_SpeakingContext context)
        {
            _context = context;
        }

        [HttpGet("{point}")]
        public async Task<string> GetLevel(int point)
        {
            var level = await _context.Level.ToListAsync();
            var levelName = level[0].Type;

            for(int i = 1; i < level.Count; i++)
            {
                if(point <= level[i].RangePoint)
                {
                    levelName = level[i-1].Type;
                    return levelName;
                }
            }
            levelName = level[level.Count-1].Type;
            return levelName;
        }
    }
}
