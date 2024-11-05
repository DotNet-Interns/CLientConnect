using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class TimeLogs
    {
        [Key]
        public int LogId { get; set; }
        public string Urls{ get; set; }
        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public int CycleTime { get; set; }
    }
}
