using BussinessLayer;
using BussinessLayer.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_MYPHAM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDonNhapController : ControllerBase
    {
        private IHoaDonNhapBUS _hoaDonNhapBUS;

        public HoaDonNhapController(IHoaDonNhapBUS hoaDonNhapBUS)
        {
            _hoaDonNhapBUS = hoaDonNhapBUS;
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
        public bool DeleteHoaDon([FromBody] int MaHoaDon)
        {
            var result = _hoaDonNhapBUS.Delete(MaHoaDon);
            return result;
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
                if (formData.Keys.Contains("NhaPhanPhoi") && !string.IsNullOrEmpty(Convert.ToString(formData["NhaPhanPhoi"]))) { TenSanPham = Convert.ToString(formData["NhaPhanPhoi"]); }
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
    }
}
