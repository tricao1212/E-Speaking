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

        [ForeignKey(nameof(Difficulty))]
        public int DifficultyId { get; set; }
        public Difficulty Difficulty { get; set; }

    }
}
