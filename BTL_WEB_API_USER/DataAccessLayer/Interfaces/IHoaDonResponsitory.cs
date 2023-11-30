using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public partial interface IHoaDonResponsitory
    {
        List<ChiTietHoaDonModelTWO> Getbyids(int MaHoaDon);
        List<HoaDonModel> Getbytaikhoan(int MaTaiKhoan);
        List<HoaDonModel> GetbytaikhoanProduct(int MaTaiKhoan);
        bool Create(HoaDonModel model);
        bool Update(HoaDonModel model);
    }
}
