using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace E_Speaking.Models
{
    public class Sentence_Lesson
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Content { get; set; }

        [ForeignKey(nameof(Level))]
        public int LevelId { get; set; }
        public Level Level { get; set; }
    }
}
