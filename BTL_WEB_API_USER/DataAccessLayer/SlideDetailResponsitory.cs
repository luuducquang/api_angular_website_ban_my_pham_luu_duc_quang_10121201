using DataAccessLayer.Helper;
using DataAccessLayer.Helper.Interfaces;
using DataAccessLayer.Interfaces;
using Model;

namespace DataAccessLayer
{
    public partial class SlideDetailResponsitory : ISlideDetailResponsitory
    {
        private IDatabaseHelper _dbHelper;

        public SlideDetailResponsitory(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<SlideDetailModel> GetAllSlide()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_get_all_silde_detail");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<SlideDetailModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
