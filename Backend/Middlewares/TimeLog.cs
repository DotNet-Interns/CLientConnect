using Backend.Models;
using Backend.Services;
using Microsoft.Extensions.Options;

namespace Backend.Middlewares
{
    public class TimeLog : IMiddleware
    {
        

        private readonly ClientConnectContext _Dbcontext;



        public TimeLog( ClientConnectContext Dbcontext)
        {
            
            _Dbcontext = Dbcontext;
        }


        public async Task InvokeAsync(HttpContext context , RequestDelegate _next )
        {

            var requestPath = context.Request.Path.ToString();
            var startTime = DateTime.Now;
            Console.Write("time log start");
            await _next(context);
            
            var endTime = DateTime.Now;
            
            var cycleTime = endTime - startTime;

            TimeLogs tl = new TimeLogs
            {
                CycleTime = Math.Abs(cycleTime.Milliseconds),
                Urls = requestPath,
                StartTime = startTime,
                EndTime = endTime
            };
            

            _Dbcontext.TimeLogs.Add(tl);
           await _Dbcontext.SaveChangesAsync();
        }

       
    }
}
