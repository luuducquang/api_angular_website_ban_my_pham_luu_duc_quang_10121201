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
        SanPhamDetailModel Getbyid(int id);
        List<AnhSanPhamModel> GetbyidImgdetail(int id);
        public List<SanPhamDetailModel> Search(int pageIndex, int pageSize, out long total, string TenSanPham, string TenDanhMuc, string Tendanhmucuudai, Decimal GiaMin, Decimal GiaMax, string TenHang, string TenNhaPhanPhoi, string XuatXu);
    }
}
