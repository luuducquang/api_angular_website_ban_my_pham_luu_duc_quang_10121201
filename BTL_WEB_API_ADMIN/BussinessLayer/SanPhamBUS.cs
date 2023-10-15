using BussinessLayer.Interfaces;
using DataAccessLayer;
using DataAccessLayer.Interfaces;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer
{
    public partial class SanPhamBUS : ISanPhamBUS
    {
        public ISanPhamResponsitory _res;

        public SanPhamBUS(ISanPhamResponsitory sanPhamResponsitory)
        {
            _res = sanPhamResponsitory;
        }

        public List<SanPhamModel> Getallsanpham()
        {
            return _res.Getallsanpham();
        }
        public SanPhamDetailModel Getbyid(int id)
        {
            return _res.Getbyid(id);
        }
        public List<AnhSanPhamModel> GetbyidImgdetail(int id)
        {
            return _res.GetbyidImgdetail(id);
        }
        public bool Create(SanPhamModel model)
        {
            return _res.Create(model);
        }

        public bool Update(SanPhamModel model)
        {
            return _res.Update(model);
        }
        public bool Delete(int MaSanPham)
        {
            return _res.Delete(MaSanPham);
        }

        public List<SanPhamDetailModel> Search(int pageIndex, int pageSize, out long total, string TenSanPham, string TenDanhMuc, string Tendanhmucuudai, Decimal Gia, string TenHang, string TenNhaPhanPhoi)
        {
            return _res.Search(pageIndex,pageSize, out total, TenSanPham,TenDanhMuc,Tendanhmucuudai,Gia,TenHang,TenNhaPhanPhoi);
        }

        public List<SanPhamModel> SearchSingle(int pageIndex, int pageSize, out long total, string TenSanPham, Decimal Gia)
        {
            return _res.SearchSingle(pageIndex, pageSize, out total, TenSanPham, Gia);
        }

    }
}
