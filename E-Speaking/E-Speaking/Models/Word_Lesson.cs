using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_Speaking.Models
{
    public class Word_Lesson
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Content { get; set; }

        [ForeignKey(nameof(Level))]
        public int LevelId { get; set; }
        public Level Level { get; set; }

    }
}
