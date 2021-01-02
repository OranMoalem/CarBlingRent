using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CarBlingRent
{
    public class JwtHelper
    {
        private readonly SymmetricSecurityKey symmetricSecurityKey;

        public JwtHelper(string key) // Must be minimum 16 chars.
        {
            byte[] keyBytes = Encoding.ASCII.GetBytes(key);
            symmetricSecurityKey = new SymmetricSecurityKey(keyBytes);
        }

        public string GetJwtToken(string username, string role)
        {
            // Create JWT Claims: 
            Claim claimByUsername = new Claim(ClaimTypes.Name, username);
            Claim claimByRole = new Claim(ClaimTypes.Role, role);
            List<Claim> claims = new List<Claim> { claimByUsername, claimByRole };
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims);

            // Encryptions (HMAC = Hash based Message Authentication Code):
            SigningCredentials signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha512);

            // Descriptor:
            SecurityTokenDescriptor securityTokenDescriptor = new SecurityTokenDescriptor();
            securityTokenDescriptor.Subject = claimsIdentity;
            securityTokenDescriptor.SigningCredentials = signingCredentials;
            securityTokenDescriptor.Expires = DateTime.UtcNow.AddHours(1);

            // Token: 
            JwtSecurityTokenHandler jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken = jwtSecurityTokenHandler.CreateToken(securityTokenDescriptor);
            string token = jwtSecurityTokenHandler.WriteToken(securityToken);

            return token;
        }

        public void SetAuthenticationOptions(AuthenticationOptions options)
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }

        public void SetBearerOptions(JwtBearerOptions options)
        {
            TokenValidationParameters tokenValidationParameters = new TokenValidationParameters();
            tokenValidationParameters.IssuerSigningKey = symmetricSecurityKey;
            tokenValidationParameters.ValidateIssuer = false;
            tokenValidationParameters.ValidateAudience = false;
            tokenValidationParameters.ClockSkew = TimeSpan.Zero; // Don't add 5 minutes by default.
            options.TokenValidationParameters = tokenValidationParameters;
        }
    }
}
