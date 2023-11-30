using DataAccessLayer.Helper;
using DataAccessLayer.Helper.Interfaces;
using DataAccessLayer.Interfaces;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public partial class SanPhamResponsitory : ISanPhamResponsitory
    {
        private IDatabaseHelper _dbHelper;

        public SanPhamResponsitory(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<SanPhamModel> Getallsanpham()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_getallsanpham");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<SanPhamModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Tang5()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedure("sp_tang_gia_sp_all_5");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Giam5()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedure("sp_giam_gia_sp_all_5");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public SanPhamDetailModel Getbyid(int id)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_get_sanpham_id",
                     "@MaSanPham", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<SanPhamDetailModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<AnhSanPhamModel> GetbyidImgdetail(int id)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_getidImgdetail",
                     "@MaSanPham", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<AnhSanPhamModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Create(SanPhamModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_create_sanpham",
                    "@MaDanhMuc", model.MaDanhMuc,
                    "@Madanhmucuudai", model.Madanhmucuudai,
                    "@TenSanPham", model.TenSanPham,
                    "@AnhDaiDien", model.AnhDaiDien,
                    "@Gia", model.Gia,
                    "@GiaGiam", model.GiaGiam,
                    "@SoLuong", model.SoLuong,
                    "@TrangThai", model.TrangThai,
                    "@TrongLuong", model.TrongLuong,
                    "@XuatXu", model.XuatXu,
                    "@list_json_chitiet_sanpham", model.list_json_chitiet_sanpham != null ? MessageConvert.SerializeObject(model.list_json_chitiet_sanpham) : null,
                    "@list_json_sanpham_nhaphanphoi", model.list_json_sanpham_nhaphanphoi != null ? MessageConvert.SerializeObject(model.list_json_sanpham_nhaphanphoi) : null,
                    "@list_json_anhsanpham", model.list_json_anhsanpham != null ? MessageConvert.SerializeObject(model.list_json_anhsanpham) : null);
                if ((result != null && !string.IsNullOrEmpty(result.ToString())) || !string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(Convert.ToString(result) + msgError);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public bool Update(SanPhamModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_update_sanpham",
                    "@MaSanPham", model.@MaSanPham,
                    "@MaDanhMuc", model.MaDanhMuc,
                    "@Madanhmucuudai", model.Madanhmucuudai,
                    "@TenSanPham", model.TenSanPham,
                    "@AnhDaiDien", model.AnhDaiDien,
                    "@Gia", model.Gia,
                    "@GiaGiam", model.GiaGiam,
                    "@SoLuong", model.SoLuong,
                    "@TrangThai", model.TrangThai,
                    "@TrongLuong", model.TrongLuong,
                    "@XuatXu", model.XuatXu,
                    "@list_json_chitiet_sanpham", model.list_json_chitiet_sanpham != null ? MessageConvert.SerializeObject(model.list_json_chitiet_sanpham) : null,
                    "@list_json_sanpham_nhaphanphoi", model.list_json_sanpham_nhaphanphoi != null ? MessageConvert.SerializeObject(model.list_json_sanpham_nhaphanphoi) : null,
                    "@list_json_anhsanpham", model.list_json_anhsanpham != null ? MessageConvert.SerializeObject(model.list_json_anhsanpham) : null);
                if ((result != null && !string.IsNullOrEmpty(result.ToString())) || !string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(Convert.ToString(result) + msgError);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public bool Delete(int MaSanPham)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_xoa_sanpham",
                    "@MaSanPham", MaSanPham);
                if ((result != null && !string.IsNullOrEmpty(result.ToString())) || !string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(Convert.ToString(result) + msgError);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public List<SanPhamDetailModel> Search(int pageIndex, int pageSize, out long total, string TenSanPham, string TenDanhMuc, string Tendanhmucuudai, Decimal GiaMin, Decimal GiaMax, string TenHang, string TenNhaPhanPhoi, string XuatXu)
        {
            string msgError = "";
            total = 0;
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_sanpham_search",
                    "@page_index", pageIndex,
                    "@page_size", pageSize,
                    "@TenSanPham", TenSanPham,
                    "@TenDanhMuc", TenDanhMuc,
                    "@Tendanhmucuudai", Tendanhmucuudai,
                    "@GiaMin", GiaMin,
                    "@GiaMax", GiaMax,
                    "@TenHang", TenHang,
                    "@TenNhaPhanPhoi", TenNhaPhanPhoi,
                    "@XuatXu", XuatXu
                    );
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0) total = (long)dt.Rows[0]["RecordCount"];
                return dt.ConvertTo<SanPhamDetailModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<SanPhamModel> SearchSingle(int pageIndex, int pageSize, out long total, string TenSanPham,Decimal Gia)
        {
            string msgError = "";
            total = 0;
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_sanpham_single_search",
                    "@page_index", pageIndex,
                    "@page_size", pageSize,
                    "@TenSanPham", TenSanPham,
                    "@Gia", Gia
                    );
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0) total = (long)dt.Rows[0]["RecordCount"];
                return dt.ConvertTo<SanPhamModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
