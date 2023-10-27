using BussinessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Model;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer
{
    public partial class UserBUS : IUserBUS
    {
        private IUserResponsitory _res;
        private string secret;
        public UserBUS(IUserResponsitory res, IConfiguration configuration)
        {
            _res = res;
            secret = configuration["AppSettings:Secret"];
        }

        public UserModel Login(string username, string password)
        {
            var admin_account = _res.Login(username, password);
            if (admin_account == null)
                return null;
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, admin_account.TenTaiKhoan.ToString()),
                    new Claim(ClaimTypes.Email, admin_account.Email)
                }),
                Expires = DateTime.UtcNow.AddMinutes(20),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.Aes128CbcHmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            admin_account.token = tokenHandler.WriteToken(token);
            return admin_account;
        }
    }
}
