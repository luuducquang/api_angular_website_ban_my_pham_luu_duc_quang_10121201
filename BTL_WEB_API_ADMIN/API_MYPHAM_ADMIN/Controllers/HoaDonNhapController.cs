using BussinessLayer;
using BussinessLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_MYPHAM.Controllers
{
    [Authorize(Roles = "1,8")]
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDonNhapController : ControllerBase
    {
        private IHoaDonNhapBUS _hoaDonNhapBUS;

        public HoaDonNhapController(IHoaDonNhapBUS hoaDonNhapBUS)
        {
            _hoaDonNhapBUS = hoaDonNhapBUS;
        }

        [AllowAnonymous]
        [Route("getbyid-mahoadon-chitiethoadonnhap/{id}")]
        [HttpGet]
        public List<ChiTietHoaDonNhapModelTWO> GetByID(int id)
        {
            return _hoaDonNhapBUS.Getbyids(id);
        }

        [Route("create-hoadonnhap")]
        [HttpPost]
        public HoaDonNhapModel CreateHoaDon([FromBody] HoaDonNhapModel model)
        {
            _hoaDonNhapBUS.Create(model);
            return model;
        }

        [Route("update-hoadonnhap")]
        [HttpPut]
        public HoaDonNhapModel UpdateHoaDon([FromBody] HoaDonNhapModel model)
        {
            _hoaDonNhapBUS.Update(model);
            return model;
        }

        [Route("delete-hoadonnhap")]
        [HttpDelete]
        public bool Delete([FromBody] List<int> formdata)
        {
            foreach (int id in formdata)
            {
                _hoaDonNhapBUS.Delete(id);
            }
            return true;
        }

        [Route("search-hoadonnhap")]
        [HttpPost]
        public IActionResult Search([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                string TenSanPham = "";
                if (formData.Keys.Contains("TenSanPham") && !string.IsNullOrEmpty(Convert.ToString(formData["TenSanPham"]))) { TenSanPham = Convert.ToString(formData["TenSanPham"]); }
                string NhaPhanPhoi = "";
                if (formData.Keys.Contains("NhaPhanPhoi") && !string.IsNullOrEmpty(Convert.ToString(formData["NhaPhanPhoi"]))) { NhaPhanPhoi = Convert.ToString(formData["NhaPhanPhoi"]); }
                DateTime? NgayTao = null;
                if (formData.Keys.Contains("NgayTao") && formData["NgayTao"] != null && formData["NgayTao"].ToString() != "")
                {
                    var dt = Convert.ToDateTime(formData["NgayTao"].ToString());
                    NgayTao = new DateTime(dt.Year, dt.Month, dt.Day, 0, 0, 0, 0);
                }
                long total = 0;
                var data = _hoaDonNhapBUS.Search(page, pageSize, out total, TenSanPham, NgayTao, NhaPhanPhoi);
                return Ok(
                   new
                   {
                       TotalItems = total,
                       Data = data,
                       Page = page,
                       PageSize = pageSize
                   }
                   );
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("search-hoadonnhapsingle")]
        [HttpPost]
        public IActionResult SearchSingle([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                string NhaPhanPhoi = "";
                if (formData.Keys.Contains("NhaPhanPhoi") && !string.IsNullOrEmpty(Convert.ToString(formData["NhaPhanPhoi"]))) { NhaPhanPhoi = Convert.ToString(formData["NhaPhanPhoi"]); }
                DateTime? fr_NgayTao = null;
                if (formData.Keys.Contains("fr_NgayTao") && formData["fr_NgayTao"] != null && formData["fr_NgayTao"].ToString() != "")
                {
                    var dt = Convert.ToDateTime(formData["fr_NgayTao"].ToString());
                    fr_NgayTao = new DateTime(dt.Year, dt.Month, dt.Day, 0, 0, 0, 0);
                }
                DateTime? to_NgayTao = null;
                if (formData.Keys.Contains("to_NgayTao") && formData["to_NgayTao"] != null && formData["to_NgayTao"].ToString() != "")
                {
                    var dt = Convert.ToDateTime(formData["to_NgayTao"].ToString());
                    to_NgayTao = new DateTime(dt.Year, dt.Month, dt.Day, 23, 59, 59, 999);
                }
                long total = 0;
                var data = _hoaDonNhapBUS.SearchSingle(page, pageSize, out total, fr_NgayTao, to_NgayTao, NhaPhanPhoi);
                return Ok(
                   new
                   {
                       TotalItems = total,
                       Data = data,
                       Page = page,
                       PageSize = pageSize
                   }
                   );
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
