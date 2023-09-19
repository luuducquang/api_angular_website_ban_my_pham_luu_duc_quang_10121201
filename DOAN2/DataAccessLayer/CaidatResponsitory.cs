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
    public partial class CaidatResponsitory : ICaidatResponsitory
    {
        private IDatabaseHelper _dbHelper;

        public CaidatResponsitory(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<CaidatModel> GettAllCaidat()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_get_all_caidat");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<CaidatModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Create(CaidatModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_them_cai_dat",
                    "@Logo",model.Logo,
                    "@GioLamViec",model.GioLamViec,
                    "@GiaoHang",model.GiaoHang,
                    "@HoanTien",model.HoanTien,
                    "@SDTLienHe",model.SDTLienHe,
                    "@EmailLienHe",model.EmailLienHe,
                    "@FaceBook",model.FaceBook,
                    "@GooglePlus",model.GooglePlus,
                    "@Twiter",model.Twiter,
                    "@YouTube",model.YouTube,
                    "@Instargram",model.Instargram,
                    "@GoogleMap",model.GoogleMap,
                    "@MatKhauMail",model.MatKhauMail
                    );
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

        public bool Update(CaidatModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_sua_cai_dat",
                    "@Id",model.Id,
                    "@Logo", model.Logo,
                    "@GioLamViec", model.GioLamViec,
                    "@GiaoHang", model.GiaoHang,
                    "@HoanTien", model.HoanTien,
                    "@SDTLienHe", model.SDTLienHe,
                    "@EmailLienHe", model.EmailLienHe,
                    "@FaceBook", model.FaceBook,
                    "@GooglePlus", model.GooglePlus,
                    "@Twiter", model.Twiter,
                    "@YouTube", model.YouTube,
                    "@Instargram", model.Instargram,
                    "@GoogleMap", model.GoogleMap,
                    "@MatKhauMail", model.MatKhauMail
                    );
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

        public bool Delete(int id)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_xoa_cai_dat",
                    "@Id", id
                    );
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
