using System.ComponentModel.DataAnnotations;

namespace E_Speaking.Models
{
    public class Level
    {
        public int Id { get; set; }

        [Required]
        public string Type { get; set; }

        public int RangePoint { get; set; }
    }
}
