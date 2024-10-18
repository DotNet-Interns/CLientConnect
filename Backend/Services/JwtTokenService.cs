using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Azure.Core;
using Backend.Models;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using NuGet.Protocol;

namespace Backend.Services
{
    public class Payload
    {
        public Payload(string uid,string role)
        {
            UserId = uid;
            Role = role;
        }
        public string UserId;
        public string Role;
    }
    public class JwtTokenService
    {
        private readonly string _secretKey;

        public JwtTokenService(IConfiguration configuration)
        {
            // Retrieve the secret key from environment variables
            _secretKey = configuration["JwtSettings:SecretKey"] ?? throw new ArgumentNullException("JWT Secret key is missing.");
        }

        public string GenerateJwtToken(int userId,string role)
        {
            // Define the token's claims (user-related data)
            var claims = new[]
            {
            new Claim(ClaimTypes.UserData, userId.ToString()),
            new Claim(ClaimTypes.Role, role),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()) // unique identifier for the token
        };

            // Generate signing credentials with the secret key
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Set token expiration time (e.g., 1 hour)
            var expiration = DateTime.UtcNow.AddHours(9);

            // Create the JWT token
            var token = new JwtSecurityToken(
                issuer: "ClientConnect",  // Specify your token issuer
                audience: "ClientConnect",  // Specify your token audience
                claims: claims,
                expires: expiration,
                signingCredentials: credentials
            );

            // Return the token string
            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        public string GetJwtToken(HttpContext context)
        {
            // Extract the cookie (if needed)
            string token = null;
            if (context.Request.Cookies.ContainsKey("AccessToken"))
            {
                token = context.Request.Cookies["AccessToken"];
                return token;
            }

           
           

            // Return null or handle the case where token is not found
            return null;
        }


        public Payload GetJwtPayload(HttpContext context)
        {

            var token = GetJwtToken(context);
            

            var handler = new JwtSecurityTokenHandler();
            JwtSecurityToken payload = (JwtSecurityToken)handler.ReadToken(token);

            string UserId = payload.Claims.First(claim => claim.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata").Value;
            string Role = payload.Claims.First(claim => claim.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role").Value;



            return new Payload(UserId,Role);

        }

        // Method to verify JWT token
        public bool VerifyJwtToken(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_secretKey);

                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = "ClientConnect",        // Same issuer as the one used to generate the token
                    ValidAudience = "ClientConnect",    // Same audience as the one used to generate the token
                    ClockSkew = TimeSpan.Zero          // No tolerance for the token expiration
                };

                // Validate the token
                ClaimsPrincipal principal = tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);

                // If no exception is thrown, token is valid
                return true;
            }
            catch (Exception)
            {
                // Token is invalid
                return false;
            }
        }
    }

}