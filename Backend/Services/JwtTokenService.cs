using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Services
{
    public class JwtTokenService
    {
        private readonly string _secretKey;

        public JwtTokenService(IConfiguration configuration)
        {
            // Retrieve the secret key from environment variables
            _secretKey = configuration["JwtSettings:SecretKey"] ?? throw new ArgumentNullException("JWT Secret key is missing.");
        }

        public string GenerateJwtToken(string username, string role)
        {
            // Define the token's claims (user-related data)
            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, username),
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