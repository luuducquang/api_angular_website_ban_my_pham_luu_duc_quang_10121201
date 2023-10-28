using DataAccessLayer.Helper;
using DataAccessLayer.Helper.Interfaces;
using DataAccessLayer.Interfaces;
using Model;

namespace DataAccessLayer
{
    public partial class QuangCaoResponsitory : IQuangCaoResponsitory
    {
        private IDatabaseHelper _dbHelper;

        public QuangCaoResponsitory(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<QuangCaoModel> GetDataAll()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_get_all_quang_cao");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<QuangCaoModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<QuangCaoModel> Search(int pageIndex, int pageSize, out long total, string MoTa)
        {
            string msgError = "";
            total = 0;
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_quang_cao_search",
                    "@page_index", pageIndex,
                    "@page_size", pageSize,
                    "@MoTa", MoTa);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0) total = (long)dt.Rows[0]["RecordCount"];
                return dt.ConvertTo<QuangCaoModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
