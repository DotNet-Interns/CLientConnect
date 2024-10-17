using System;
using System.Net;
using System.Threading.Tasks;
using Backend.Services;

namespace Backend.Middlewares
{
    public class Authenticate
    {
        private readonly RequestDelegate _next;
        private readonly JwtTokenService _jwtTokenService;

        public Authenticate(RequestDelegate next, JwtTokenService jwtTokenService)
        {
            _next = next;
            _jwtTokenService = jwtTokenService;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            var token = context.Request.Headers["Auth_Token"].FirstOrDefault();

            if (!string.IsNullOrEmpty(token) && token.StartsWith("Bearer "))
            {
                token = token.Substring("Bearer ".Length).Trim();
                if (token == null || !_jwtTokenService.VerifyJwtToken(token))
                {
                    context.Response.StatusCode = 401; // Unauthorized
                    await context.Response.WriteAsync("Unauthorized");
                    return;
                }
            }
            await _next(context);
        }
    }
}