using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public partial interface ITaiKhoanResponsitory
    {
        bool Create(TaiKhoanModel model);

        bool Doimk(DoimkModel model);
        bool Delete(int MaTaiKhoan);
        public List<TaiKhoanSearchModel> Search(int pageIndex, int pageSize, out long total,string TenTaiKhoan, string Email, string HoTen, string SoDienThoai);

    }
}
