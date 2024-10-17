using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Backend.Services;
using Microsoft.AspNetCore.Http;

namespace Backend.Middlewares
{
    public class Authenticate
    {
        private readonly RequestDelegate _next;
        private readonly JwtTokenService _jwtTokenService;
        private readonly HashSet<string> _allowedRoutes;

        public Authenticate(RequestDelegate next, JwtTokenService jwtTokenService)
        {
            _next = next;
            _jwtTokenService = jwtTokenService;

            // Initialize the list of allowed routes
            _allowedRoutes = new HashSet<string>
            {
                "/api/Auth",
            };
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Check if the request path is in the list of allowed routes
            var requestPath = context.Request.Path.ToString();
            Console.Write(requestPath);
            // Allow access to the specified routes without token verification
            if (_allowedRoutes.Contains(requestPath))
            {
                await _next(context); // Proceed to the next middleware
                return;
            }

            var token = context.Request.Headers["Auth_Token"].FirstOrDefault();

            if (!string.IsNullOrEmpty(token) && token.StartsWith("Bearer "))
            {
                token = token.Substring("Bearer ".Length).Trim();

                if (!_jwtTokenService.VerifyJwtToken(token))
                {
                    context.Response.StatusCode = 401; // Unauthorized
                    await context.Response.WriteAsync("Unauthorized Token");
                    return;
                }
            }
            else
            {
                // Handle the case where the token is missing or improperly formatted
                context.Response.StatusCode = 401; // Unauthorized
                await context.Response.WriteAsync("Unauthorized Token");
                return;
            }

            await _next(context); 
        }
    }
}
