using Book_Borrowing_System_Backend.Model;
using BookBorrowbackend.Domainlayer.DTO;
using BookBorrowbackend.Domainlayer.IRepository;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace BookBorrowBackend.Buisnesslayer.Repository
{
    public class AuthServiceRepository:IAuthServiceRepository
    {
        private readonly UserManager<BookBorrowUser> bookborrowuser;
        private readonly IConfiguration _config;
        public AuthServiceRepository(UserManager<BookBorrowUser> bookborrowuser, IConfiguration _config)
        {
            this.bookborrowuser = bookborrowuser;
            this._config = _config;
        }
        // to regiter the user to the database
        public async Task<bool> RegisterUser([FromBody] RequestForRegisterDTO RequestforRegisterDTO)
        {
            try
            {
                var applicationUser = new BookBorrowUser
                {
                    UserName = RequestforRegisterDTO.Username,
                    Email = RequestforRegisterDTO.Username,
                    Name = RequestforRegisterDTO.Name
                };
                var result = await bookborrowuser.CreateAsync(applicationUser, RequestforRegisterDTO.Password);
                return result.Succeeded;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                throw;
            }

        }
        [HttpPost]
        public async Task<BookBorrowUser> Login([FromBody] RequestForLoginDTO RequestforLoginDTO)
        {
            try
            {
                var applicationUser = await bookborrowuser.FindByEmailAsync(RequestforLoginDTO.Username);
                var result = await bookborrowuser.CheckPasswordAsync(applicationUser, RequestforLoginDTO.Password);
                if (applicationUser != null && result)
                {
                    return applicationUser;
                }
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                throw;
            }
        }
        // It creates the token
        public string GenerateTokenString(RequestForLoginDTO RequestforLoginDTO, BookBorrowUser user)
        {
            try
            {
                var claims = new List<Claim>
               {
                    new Claim(ClaimTypes.Email,RequestforLoginDTO.Username),
                    new Claim(ClaimTypes.Role,"User"),
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim("Name", user.Name)
               };
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("Jwt:Key").Value));
                var signingCred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                var securityToken = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(100),
                    issuer: _config.GetSection("Jwt:Issuer").Value,
                    audience: _config.GetSection("Jwt:Audience").Value,
                    signingCredentials: signingCred);
                string tokenString = new JwtSecurityTokenHandler().WriteToken(securityToken);
                return tokenString;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                throw;
            }
        }


    }
}
