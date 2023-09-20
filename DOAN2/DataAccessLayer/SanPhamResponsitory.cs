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
    public partial class SanPhamResponsitory : ISanPhamResponsitory
    {
        private IDatabaseHelper _dbHelper;

        public SanPhamResponsitory(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
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
                    "@LuotXem", model.LuotXem,
                    "@DacBiet", model.DacBiet,
                    "@list_json_chitiet_sanpham", model.list_json_chitiet_sanpham != null ? MessageConvert.SerializeObject(model.list_json_chitiet_sanpham) : null);
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
                    "@LuotXem", model.LuotXem,
                    "@DacBiet", model.DacBiet,
                    "@list_json_chitiet_sanpham", model.list_json_chitiet_sanpham != null ? MessageConvert.SerializeObject(model.list_json_chitiet_sanpham) : null);
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
