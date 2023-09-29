using BussinessLayer;
using BussinessLayer.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_MYPHAM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDonController : ControllerBase
    {
        private IHoaDonBUS _hoaDonBUS;

        public HoaDonController(IHoaDonBUS hoaDonBUS)
        {
            _hoaDonBUS = hoaDonBUS;
        }

        [Route("create-hoadon")]
        [HttpPost]
        public HoaDonModel CreateHoaDon([FromBody] HoaDonModel model)
        {
            _hoaDonBUS.Create(model);
            return model;
        }


        [Route("update-hoadon")]
        [HttpPut]
        public HoaDonModel UpdateHoaDon([FromBody] HoaDonModel model)
        {
            _hoaDonBUS.Update(model);
            return model;
        }

        [Route("delete-hoadon")]
        [HttpDelete]
        public bool DeleteHoaDon([FromBody] int MaHoaDon)
        {
            var result = _hoaDonBUS.Delete(MaHoaDon);
            return result;
        }

        [Route("search-hoadon")]
        [HttpPost]
        public IActionResult Search([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                string TenKH = "";
                if (formData.Keys.Contains("TenKH") && !string.IsNullOrEmpty(Convert.ToString(formData["TenKH"]))) { TenKH = Convert.ToString(formData["TenKH"]); }
                string TenSanPham = "";
                if (formData.Keys.Contains("TenSanPham") && !string.IsNullOrEmpty(Convert.ToString(formData["TenSanPham"]))) { TenKH = Convert.ToString(formData["TenSanPham"]); }
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
                var data = _hoaDonBUS.Search(page, pageSize, out total, TenKH, fr_NgayTao, to_NgayTao, TenSanPham);
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
