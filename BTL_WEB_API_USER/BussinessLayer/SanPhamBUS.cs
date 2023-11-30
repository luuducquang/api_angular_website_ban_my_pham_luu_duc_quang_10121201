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

        public SanPhamDetailModel Getbyid(int id)
        {
            return _res.Getbyid(id);
        }
        public List<ThongkespbanchaytrongthangModel> SpUathich()
        {
            return _res.SpUathich();
        }   
        public List<AnhSanPhamModel> GetbyidImgdetail(int id)
        {
            return _res.GetbyidImgdetail(id);
        }
        public List<SanPhamDetailModel> Search(int pageIndex, int pageSize, out long total, string TenSanPham, string TenDanhMuc, string Tendanhmucuudai, Decimal GiaMin, Decimal GiaMax, string TenHang, string TenNhaPhanPhoi, string XuatXu)
        {
            return _res.Search(pageIndex, pageSize, out total, TenSanPham, TenDanhMuc, Tendanhmucuudai, GiaMin, GiaMax, TenHang, TenNhaPhanPhoi, XuatXu);
        }
        public List<SanPhamDetailModel> SearchTang(int pageIndex, int pageSize, out long total, string TenSanPham, string TenDanhMuc, string Tendanhmucuudai, Decimal GiaMin, Decimal GiaMax, string TenHang, string TenNhaPhanPhoi, string XuatXu)
        {
            return _res.SearchTang(pageIndex, pageSize, out total, TenSanPham, TenDanhMuc, Tendanhmucuudai, GiaMin, GiaMax, TenHang, TenNhaPhanPhoi, XuatXu);
        }
        public List<SanPhamDetailModel> SearchGiam(int pageIndex, int pageSize, out long total, string TenSanPham, string TenDanhMuc, string Tendanhmucuudai, Decimal GiaMin, Decimal GiaMax, string TenHang, string TenNhaPhanPhoi, string XuatXu)
        {
            return _res.SearchGiam(pageIndex, pageSize, out total, TenSanPham, TenDanhMuc, Tendanhmucuudai, GiaMin, GiaMax, TenHang, TenNhaPhanPhoi, XuatXu);
        }

        public List<SanPhamDetailModel> Searchbanchay(int pageIndex, int pageSize, out long total, string TenSanPham, string TenDanhMuc, string Tendanhmucuudai, Decimal GiaMin, Decimal GiaMax, string TenHang, string TenNhaPhanPhoi, string XuatXu)
        {
            return _res.Searchbanchay(pageIndex, pageSize, out total, TenSanPham, TenDanhMuc, Tendanhmucuudai, GiaMin, GiaMax, TenHang, TenNhaPhanPhoi, XuatXu);
        }

        public List<SanPhamDetailModel> SearchLuotXem(int pageIndex, int pageSize, out long total, string TenSanPham, string TenDanhMuc, string Tendanhmucuudai, Decimal GiaMin, Decimal GiaMax, string TenHang, string TenNhaPhanPhoi, string XuatXu)
        {
            return _res.SearchLuotXem(pageIndex, pageSize, out total, TenSanPham, TenDanhMuc, Tendanhmucuudai, GiaMin, GiaMax, TenHang, TenNhaPhanPhoi, XuatXu);
        }

    }
}
