using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_Speaking.Models
{
    public class Word
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Content { get; set; }

        [ForeignKey(nameof(Lesson))]
        public int LessonId { get; set; }
        public Lesson Lesson { get; set; }

    }
}
