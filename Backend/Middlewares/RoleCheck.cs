using Backend.Services;

namespace Backend.Middlewares
{
    public class RoleCheck
    {
        private readonly RequestDelegate _next;
        private readonly JwtTokenService _jwtTokenService;
        private readonly HashSet<string> _notAllowedRoutes;
        
        public RoleCheck(RequestDelegate next, JwtTokenService jwtTokenService )
        {
            _next = next;
            _jwtTokenService = jwtTokenService;
            
            _notAllowedRoutes = new HashSet<string> { "" };
            
        }

        public async Task InvokeAsync(HttpContext context)
        {
            
            var requestPath = context.Request.Path.ToString();
            Console.WriteLine(requestPath);

            if (_notAllowedRoutes.Contains(requestPath))
            {
                Console.WriteLine("called");
                if (CheckUserRole(context))
                {
                    await _next(context);
                }
                else
                {
                    context.Response.StatusCode = 401; // Unauthorized
                    await context.Response.WriteAsync("Unauthorized User");
                    return;
                }
            }
           await _next(context);
        }

        private bool CheckUserRole(HttpContext context)
        {
            Payload userPayload = _jwtTokenService.GetJwtPayload(context);
            
            if (userPayload.Role == "SalesRepresentative")
            {
                return false;
            }
            return true;
        }
    }
}
