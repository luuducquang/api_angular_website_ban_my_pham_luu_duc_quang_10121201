using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer.Interfaces
{
    public partial interface IUserBUS
    {
        UserModel Login(string taikhoan, string matkhau);
    }
}
