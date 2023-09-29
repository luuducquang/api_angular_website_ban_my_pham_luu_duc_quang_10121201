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
        bool Create(HoaDonModel model);
        bool Update(HoaDonModel model);
        bool Delete(int MaHoaDon);
        List<ThongkeHoaDonModel> Search(int pageIndex, int pageSize, out long total, string TenKH, DateTime? fr_NgayTao, DateTime? to_NgayTao,string TenSanPham);

    }
}
