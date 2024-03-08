using System.ComponentModel.DataAnnotations;

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
    }
}
