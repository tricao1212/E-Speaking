using System.ComponentModel.DataAnnotations;

namespace E_Speaking.Models
{
    public class Difficulty
    {
        public int Id { get; set; }
        [Required]
        public string Type { get; set; }
        public ICollection<Word> Words { get; set; }
        public ICollection<Sentence> Sentences { get; set; }
    }
}
