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
        public bool Create(HoaDonModel model);
        public bool Update(HoaDonModel model);
        bool Delete(int MaHoaDon);
        List<ThongkeHoaDonModel> Search(int pageIndex, int pageSize, out long total, string TenKH, string TrangThai, DateTime? fr_NgayTao, DateTime? to_NgayTao, string SDT);
        List<HoaDonModelTWO> SearchSingle(int pageIndex, int pageSize, out long total, string TenKH, string TrangThai, DateTime? fr_NgayTao, DateTime? to_NgayTao, string SDT);

    }
}
