using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public partial interface IDanhGiaResponsitory
    {
        public List<DanhGiaModel> Getbyids(int pageIndex, int pageSize, out long total, int MaSanPham, int ChatLuong, string NoiDung, DateTime? fr_NgayTao, DateTime? to_NgayTao);
        bool Create(DanhGiaModel model);

    }
}
