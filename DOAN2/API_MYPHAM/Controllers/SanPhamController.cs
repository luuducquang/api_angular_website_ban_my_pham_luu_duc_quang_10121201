using BussinessLayer;
using BussinessLayer.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_MYPHAM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SanPhamController : ControllerBase
    {
        private ISanPhamBUS _sanPhamBUS;

        public SanPhamController(ISanPhamBUS sanPhamBUS)
        {
            _sanPhamBUS = sanPhamBUS;
        }

        [Route("create-sanpham")]
        [HttpPost]
        public SanPhamModel CreateSanpham([FromBody] SanPhamModel model)
        {
            _sanPhamBUS.Create(model);
            return model;
        }

        [Route("update-sanpham")]
        [HttpPut]
        public SanPhamModel UpdateSanpham([FromBody] SanPhamModel model)
        {
            _sanPhamBUS.Update(model);
            return model;
        }

        [Route("delete-sanpham")]
        [HttpDelete]
        public bool DeleteSanPham([FromBody] int MaSanPham)
        {
            return _sanPhamBUS.Delete(MaSanPham);
        }

        [Route("search-sanpham")]
        [HttpPost]
        public IActionResult Search([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                string TenSanPham = "";
                if (formData.Keys.Contains("TenSanPham") && !string.IsNullOrEmpty(Convert.ToString(formData["TenSanPham"]))) { TenSanPham = Convert.ToString(formData["TenSanPham"]); }
                long total = 0;
                var data = _sanPhamBUS.Search(page, pageSize, out total, TenSanPham);
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
