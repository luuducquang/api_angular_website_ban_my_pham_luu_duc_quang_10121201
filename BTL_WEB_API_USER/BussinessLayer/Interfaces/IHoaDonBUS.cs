using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer.Interfaces
{
    public partial interface IHoaDonBUS
    {
        List<ChiTietHoaDonModelTWO> Getbyids(int MaHoaDon);
        List<HoaDonModel> Getbytaikhoan(int MaTaiKhoan);
        List<HoaDonModel> GetbytaikhoanProduct(int MaTaiKhoan);
        public bool Create(HoaDonModel model);
        public bool Update(HoaDonModel model);
    }
}
