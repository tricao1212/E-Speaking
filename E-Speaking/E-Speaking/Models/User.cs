using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_Speaking.Models
{
    public class User
    {
        [Key]
        public string UID { get; set; }
        public string Avatar { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public int Role { get; set; }
        public ICollection<Process> Processes { get; set; }
        [ForeignKey(nameof(Level))]
        public int LevelId { get; set; }
        public Level Level { get; set; }
        public int Point { get ; set; }

    }
}
