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
    public partial class OverviewResponsitory : IOverviewResponsitory
    {
        private IDatabaseHelper _dbHelper;

        public OverviewResponsitory(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public OverViewModel Tongquan()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_overview");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<OverViewModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ThongketheonamModel> Thongkenam(int nam)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_ThongKeDoanhThuNam",
                     "@Nam", nam);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ThongketheonamModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ThongketienchitheonamModel> Thongketienchinam(int nam)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_ThongKeTienChiNam",
                     "@Nam", nam);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ThongketienchitheonamModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ThongkedoanhthungayModel> Thongkedoanhthungay(int Nam, int Thang)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_ThongKeDoanhThuTrongThang",
                     "@Nam", Nam,
                     "@Thang", Thang);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ThongkedoanhthungayModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ThongketienchingayModel> Thongketienchingay(int Nam, int Thang)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_ThongKeTienChiTrongThang",
                     "@Nam", Nam,
                     "@Thang", Thang);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ThongketienchingayModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ThongkeHDBNamModel> Thongkehdbnam(int nam)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_ThongKeHDBNam",
                     "@Nam", nam);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ThongkeHDBNamModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ThongkeHDBNgayModel> Thongkehdbngay(int Nam, int Thang)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_ThongKeHDBNgay",
                     "@Nam", Nam,
                     "@Thang", Thang);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ThongkeHDBNgayModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ThongkeHDNNamModel> Thongkehdnnam(int nam)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_ThongKeHDNNam",
                     "@Nam", nam);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ThongkeHDNNamModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ThongkeHDNNgayModel> Thongkehdnngay(int Nam, int Thang)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_ThongKeHDNNgay",
                     "@Nam", Nam,
                     "@Thang", Thang);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ThongkeHDNNgayModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ThongkeKHNamModel> Thongkekhnam(int nam)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_ThongKeKHNam",
                     "@Nam", nam);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ThongkeKHNamModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ThongkeKHNgayModel> Thongkekhngay(int Nam, int Thang)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_ThongKeKHNgay",
                     "@Nam", Nam,
                     "@Thang", Thang);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ThongkeKHNgayModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ThongkespbanchaytrongthangModel> Spbanchaythang()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_sanphambanchaytrongthang");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ThongkespbanchaytrongthangModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ThongkespbanchaytrongthangModel> Spsaphet()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_sanphamsaphet");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ThongkespbanchaytrongthangModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
