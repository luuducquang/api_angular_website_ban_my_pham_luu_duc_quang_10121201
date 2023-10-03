using DataAccessLayer.Helper;
using DataAccessLayer.Helper.Interfaces;
using DataAccessLayer.Interfaces;
using Model;

namespace DataAccessLayer
{
    public partial class DanhMucUuDaiResponsitory : IDanhMucUuDaiResponsitory
    {
        private IDatabaseHelper _dbHelper;

        public DanhMucUuDaiResponsitory(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<DanhmucUuudaisModel> GetAllDanhmucUuudais()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_get_all_danhmucuudai");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<DanhmucUuudaisModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Create(DanhmucUuudaisModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_them_danhmucuudai",
                "@Tendanhmucuudai", model.Tendanhmucuudai,
                "@DacBiet", model.DacBiet,
                "@NoiDung", model.NoiDung);
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

        public bool Update(DanhmucUuudaisModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_sua_danhmucuudai"
                    , "@Madanhmucuudai", model.Madanhmucuudai,
                "@Tendanhmucuudai", model.Tendanhmucuudai,
                "@DacBiet", model.DacBiet,
                "@NoiDung", model.NoiDung);
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

        public bool Delete(int madanhmucuudai )
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_xoa_danhmucuudai"
                    , "@Madanhmucuudai", madanhmucuudai);
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

        public List<DanhmucUuudaisModel> Search(int pageIndex, int pageSize, out long total, string Tendanhmucuudai)
        {
            string msgError = "";
            total = 0;
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_danhmucuudai_search",
                    "@page_index", pageIndex,
                    "@page_size", pageSize,
                    "@Tendanhmucuudai", Tendanhmucuudai);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0) total = (long)dt.Rows[0]["RecordCount"];
                return dt.ConvertTo<DanhmucUuudaisModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
