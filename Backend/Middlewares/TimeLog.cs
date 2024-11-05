using Backend.Models;
using Backend.Services;
using Microsoft.Extensions.Options;

namespace Backend.Middlewares
{
    public class TimeLog
    {
        private readonly RequestDelegate _next;

        private readonly ClientConnectContext _Dbcontext;



        public TimeLog(RequestDelegate next, ClientConnectContext Dbcontext)
        {
            _next = next;
            _Dbcontext = Dbcontext;
        }


        public async Task InvokeAsync(HttpContext context)
        {

            var requestPath = context.Request.Path.ToString();
            var startTime = DateTime.Now;
            await _next(context);
            var endTime = DateTime.Now;
            var cycleTime = endTime.TimeOfDay.Milliseconds - startTime.TimeOfDay.Milliseconds;

            TimeLogs tl = new TimeLogs
            {
                CycleTime = cycleTime,
                Urls = requestPath,
                StartTime = startTime,
                EndTime = endTime
            };

            _Dbcontext.TimeLogs.Add(tl);
           await _Dbcontext.SaveChangesAsync();
        }
    }
}
