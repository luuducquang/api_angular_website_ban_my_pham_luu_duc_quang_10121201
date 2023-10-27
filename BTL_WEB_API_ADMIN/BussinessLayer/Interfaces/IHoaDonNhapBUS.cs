using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer.Interfaces
{
    public partial interface IHoaDonNhapBUS
    {
        List<ChiTietHoaDonNhapModelTWO> Getbyids(int MaHoaDon);
        public bool Create(HoaDonNhapModel model);
        public bool Update(HoaDonNhapModel model); 
        bool Delete(int MaHoaDon);
        List<ThongkeHoaDonNhapModel> Search(int pageIndex, int pageSize, out long total, string TenSanPham, DateTime? NgayTao, string NhaPhanPhoi);
        List<HoaDonNhapModelTWO> SearchSingle(int pageIndex, int pageSize, out long total, DateTime? fr_NgayTao, DateTime? to_NgayTao, string NhaPhanPhoi);

    }
}
