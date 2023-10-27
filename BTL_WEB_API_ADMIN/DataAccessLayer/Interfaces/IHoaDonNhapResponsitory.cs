using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public partial interface IHoaDonNhapResponsitory
    {
        List<ChiTietHoaDonNhapModelTWO> Getbyids(int MaHoaDon);
        bool Create(HoaDonNhapModel model);
        bool Update(HoaDonNhapModel model);
        bool Delete(int MaHoaDon);
        List<ThongkeHoaDonNhapModel> Search(int pageIndex, int pageSize, out long total, string TenSanPham, DateTime? NgayTao, string NhaPhanPhoi);
        List<HoaDonNhapModelTWO> SearchSingle(int pageIndex, int pageSize, out long total, DateTime? fr_NgayTao, DateTime? to_NgayTao, string NhaPhanPhoi);

    }
}
