using DataAccessLayer.Helper;
using DataAccessLayer.Helper.Interfaces;
using DataAccessLayer.Interfaces;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public partial class DanhGiaResponsitory : IDanhGiaResponsitory
    {
        private IDatabaseHelper _dbHelper;

        public DanhGiaResponsitory(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }
        public List<DanhGiaModel> Getbyids(int pageIndex, int pageSize, out long total, int MaSanPham, int ChatLuong, string NoiDung, DateTime? fr_NgayTao, DateTime? to_NgayTao)
        {
            string msgError = "";
            total = 0;
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_danhgiagetsp",
                    "@page_index", pageIndex,
                    "@page_size", pageSize,
                    "@MaSanPham", MaSanPham,
                    "@ChatLuong", ChatLuong,
                    "@NoiDung", NoiDung,
                    "@fr_NgayTao", fr_NgayTao,
                    "@to_NgayTao", to_NgayTao
                    );
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0) total = (long)dt.Rows[0]["RecordCount"];
                return dt.ConvertTo<DanhGiaModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Create(DanhGiaModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_create_danh_gia",
                    "@MaSanPham", model.MaSanPham,
                    "@MaTaiKhoan", model.MaTaiKhoan,
                    "@ChatLuong", model.ChatLuong,
                    "@NoiDung", model.NoiDung,
                    "@TrangThai", model.TrangThai,
                    "@ThoiGian", model.ThoiGian,
                    "@AnhDanhGia", model.AnhDanhGia,
                    "@GhiChu", model.GhiChu);
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

        public bool Update(DanhGiaModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_update_danhgia",
                    "@MaDanhGia", model.MaDanhGia,
                    "@GhiChu", model.GhiChu);
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

        public bool Delete(int madanhgia)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_xoa_danhgia"
                    , "@MaDanhGia", madanhgia);
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
    }
}
