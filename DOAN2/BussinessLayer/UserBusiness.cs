using BusinessLogicLayer;
using DataAccessLayer;
using DataModel;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Sockets;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace BusinessLogicLayer
{
    public class UserBusiness:IUserBusiness
    {
        private IUserRepository _res;
        private string secret;
        public UserBusiness(IUserRepository res, IConfiguration configuration)
        {
            _res = res;
            secret = configuration["AppSettings:Secret"];
            if (string.IsNullOrEmpty(secret) || secret.Length < 22)
            {
                var rng = new RNGCryptoServiceProvider();
                var key = new byte[16]; // 128 bit
                rng.GetBytes(key);
                secret = Convert.ToBase64String(key);
            }
        }

        public UserModel Login(string taikhoan, string matkhau)
        {
            var user = _res.Login(taikhoan, matkhau);
            if (user == null)
                return null; 
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.TenTaiKhoan.ToString()),
                    new Claim(ClaimTypes.StreetAddress, user.Email)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.Aes128CbcHmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.token = tokenHandler.WriteToken(token);
            return user; 
        }
    }
}