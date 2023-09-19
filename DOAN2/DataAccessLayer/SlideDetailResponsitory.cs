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

        public bool Create(SlideDetailModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_them_slide",
                "@TieuDe", model.TieuDe,
                "@TieuDe1", model.TieuDe1,
                "@TieuDe2", model.TieuDe2,
                "@MoTa1", model.MoTa1,
                "@MoTa2", model.MoTa2,
                "@MoTa3", model.MoTa3,
                "@MoTa4", model.MoTa4,
                "@LinkAnh", model.LinkAnh);
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

        public bool Update(SlideDetailModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_suaslide"
                    ,"@MaAnh",model.MaAnh,
                "@TieuDe", model.TieuDe,
                "@TieuDe1", model.TieuDe1,
                "@TieuDe2", model.TieuDe2,
                "@MoTa1", model.MoTa1,
                "@MoTa2", model.MoTa2,
                "@MoTa3", model.MoTa3,
                "@MoTa4", model.MoTa4,
                "@LinkAnh", model.LinkAnh);
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

        public bool Delete(int MaAnh )
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_xoaslide"
                    , "@MaAnh", MaAnh);
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
