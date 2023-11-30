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
        List<SanPhamModel> Getallsanpham();
        void Tang5();
        void Giam5();
        SanPhamDetailModel  Getbyid(int id);
        List<AnhSanPhamModel> GetbyidImgdetail(int id);
        bool Create(SanPhamModel model);

        bool Update(SanPhamModel model);
        bool Delete(int MaSanPham);

        public List<SanPhamDetailModel> Search(int pageIndex, int pageSize, out long total,string TenSanPham, string TenDanhMuc, string Tendanhmucuudai, Decimal GiaMin,Decimal GiaMax, string TenHang, string TenNhaPhanPhoi, string XuatXu);
        public List<SanPhamModel> SearchSingle(int pageIndex, int pageSize, out long total,string TenSanPham, Decimal Gia);
    }
}
