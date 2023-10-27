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

        public SanPhamDetailModel Getbyid(int id)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_get_sanpham_id",
                     "@MaSanPham", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<SanPhamDetailModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<AnhSanPhamModel> GetbyidImgdetail(int id)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_getidImgdetail",
                     "@MaSanPham", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<AnhSanPhamModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<SanPhamDetailModel> Search(int pageIndex, int pageSize, out long total, string TenSanPham, string TenDanhMuc, string Tendanhmucuudai, Decimal GiaMin, Decimal GiaMax, string TenHang, string TenNhaPhanPhoi, string XuatXu)
        {
            string msgError = "";
            total = 0;
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_sanpham_search",
                    "@page_index", pageIndex,
                    "@page_size", pageSize,
                    "@TenSanPham", TenSanPham,
                    "@TenDanhMuc", TenDanhMuc,
                    "@Tendanhmucuudai", Tendanhmucuudai,
                    "@GiaMin", GiaMin,
                    "@GiaMax", GiaMax,
                    "@TenHang", TenHang,
                    "@TenNhaPhanPhoi", TenNhaPhanPhoi,
                    "@XuatXu", XuatXu
                    );
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0) total = (long)dt.Rows[0]["RecordCount"];
                return dt.ConvertTo<SanPhamDetailModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
