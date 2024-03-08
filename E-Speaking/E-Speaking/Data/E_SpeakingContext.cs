using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using E_Speaking.Models;

namespace E_Speaking.Data
{
    public class E_SpeakingContext : DbContext
    {
        public E_SpeakingContext (DbContextOptions<E_SpeakingContext> options)
            : base(options)
        {
        }

        public DbSet<E_Speaking.Models.Word> Word { get; set; } = default!;
        public DbSet<E_Speaking.Models.Sentence> Sentence { get; set; } = default!;
        public DbSet<E_Speaking.Models.User> User { get; set; } = default!;
        public DbSet<E_Speaking.Models.Level> Level { get; set; }
        public DbSet<E_Speaking.Models.Lesson> Lesson { get; set; }
        public DbSet<E_Speaking.Models.Process> Process { get; set; }
    }
}
