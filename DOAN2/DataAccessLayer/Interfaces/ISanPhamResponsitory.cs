using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public partial interface ISanPhamResponsitory
    {
        bool Create(SanPhamModel model);

        bool Update(SanPhamModel model);
        bool Delete(int MaSanPham);

        public List<SanPhamDetailModel> Search(int pageIndex, int pageSize, out long total,string TenSanPham, string TenDanhMuc, string Tendanhmucuudai, Decimal Gia, string TenHang, string TenNhaPhanPhoi);
    }
}
