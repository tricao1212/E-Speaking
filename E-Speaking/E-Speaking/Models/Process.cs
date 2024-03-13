using System.ComponentModel.DataAnnotations.Schema;

namespace E_Speaking.Models
{
    public class Process
    {
        public int Id { get; set; }
        [ForeignKey(nameof(User))]
        public string UserUID { get; set; }
        [ForeignKey(nameof(Lesson))]
        public int LessonId { get; set; }
        public int Progress {  get; set; }
        public DateTime AttemptTime { get; set; }
        public string Type { get; set; }
    }
}
