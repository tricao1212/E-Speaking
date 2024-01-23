using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace E_Speaking.Models
{
    public class Sentence
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Content { get; set; }

        [ForeignKey(nameof(Difficulty))]
        public int DifficultyId { get; set; }
        public Difficulty Difficulty { get; set; }
    }
}
