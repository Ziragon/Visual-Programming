using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Model
{
    public class Log
    {
        public int Id { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        [StringLength(20)]
        public string Level { get; set; }
        public string Message { get; set; }
        public string? Exception { get; set; }
        public string? Source { get; set; }
    }
}
