using DataAccessLayer.Helper;
using DataAccessLayer.Helper.Interfaces;
using DataAccessLayer.Interfaces;
using Model;

namespace DataAccessLayer
{
    public partial class HangSanXuatResponsitory : IHangSanXuatResponsitory
    {
        private IDatabaseHelper _dbHelper;

        public HangSanXuatResponsitory(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<HangSanXuatModel> GetHangSanXuats()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_get_all_hangsanxuat");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<HangSanXuatModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Create(HangSanXuatModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_them_hangsanxuat",
                "@TenHang", model.TenHang,
                "@LinkWeb", model.LinkWeb,
                "@AnhDaiDien", model.AnhDaiDien);
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

        public bool Update(HangSanXuatModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_sua_hangsanxuat"
                    , "@MaNhaSanXuat", model.MaNhaSanXuat,
                "@TenHang", model.TenHang,
                "@LinkWeb", model.LinkWeb,
                "@AnhDaiDien", model.AnhDaiDien);
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

        public bool Delete(int mahsx)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_xoa_nhasanxuat"
                    , "@MaNhaSanXuat", mahsx);
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

        public List<HangSanXuatModel> Search(int pageIndex, int pageSize, out long total, string TenHang)
        {
            string msgError = "";
            total = 0;
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_hangsanxuat_search",
                    "@page_index", pageIndex,
                    "@page_size", pageSize,
                    "@TenHang", TenHang);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0) total = (long)dt.Rows[0]["RecordCount"];
                return dt.ConvertTo<HangSanXuatModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
