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
        bool Create(HoaDonNhapModel model);
        bool Update(HoaDonNhapModel model);
        List<HoaDonNhapModel> Search(int pageIndex, int pageSize, out long total, string TenSanPham, DateTime? NgayTao);

    }
}
