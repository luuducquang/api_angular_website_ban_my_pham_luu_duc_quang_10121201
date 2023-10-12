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
    public partial class TaiKhoanResponsitory : ITaiKhoanResponsitory
    {
        private IDatabaseHelper _dbHelper;

        public TaiKhoanResponsitory(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public bool Create(TaiKhoanModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_create_taikhoan",
                    "@TenTaiKhoan", model.TenTaiKhoan,
                    "@MatKhau", model.MatKhau,
                    "@Email", model.Email,
                    "@list_json_chitiet_taikhoan", model.list_json_chitiet_taikhoan != null ? MessageConvert.SerializeObject(model.list_json_chitiet_taikhoan) : null);
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

        public bool Update(TaiKhoanModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_update_taikhoan",
                    "@MaTaiKhoan", model.MaTaiKhoan,
                    "@Email", model.Email,
                    "@list_json_chitiet_taikhoan", model.list_json_chitiet_taikhoan != null ? MessageConvert.SerializeObject(model.list_json_chitiet_taikhoan) : null);
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

        public bool Doimk(DoimkModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_doimk_taikhoan",
                    "@TenTaiKhoan", model.TenTaiKhoan,
                    "@MatKhau",model.MatKhau);
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

        public bool Delete(int MaTaiKhoan)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_xoa_taikhoan",
                    "@MaTaiKhoan", MaTaiKhoan);
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
        public List<TaiKhoanSearchModel> Search(int pageIndex, int pageSize, out long total, string TenTaiKhoan, string Email, string HoTen, string SoDienThoai)
        {
            string msgError = "";
            total = 0;
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_taikhoan_search",
                    "@page_index", pageIndex,
                    "@page_size", pageSize,
                    "@TenTaiKhoan", TenTaiKhoan,
                    "@Email", Email,
                    "@HoTen", HoTen,
                    "@SoDienThoai", SoDienThoai
                    );
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0) total = (long)dt.Rows[0]["RecordCount"];
                return dt.ConvertTo<TaiKhoanSearchModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
