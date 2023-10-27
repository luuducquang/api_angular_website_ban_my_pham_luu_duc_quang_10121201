using BussinessLayer;
using BussinessLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_MYPHAM.Controllers
{
    [Authorize(Roles = "1")]
    [Route("api/[controller]")]
    [ApiController]
    public class HangSanXuatController : ControllerBase
    {
        private IHangSanXuatBUS _hangSanXuatBUS;

        public HangSanXuatController(IHangSanXuatBUS hangSanXuatBUS)
        {
            _hangSanXuatBUS = hangSanXuatBUS;
        }

        [AllowAnonymous]
        [Route("get-all-hangsanxuat")]
        [HttpGet]
        public IEnumerable<HangSanXuatModel> GetDataAll()
        {
            return _hangSanXuatBUS.GetHangSanXuats();
        }


        [Route("create-hangsanxuat")]
        [HttpPost]
        public bool Create(HangSanXuatModel model)
        {
            return _hangSanXuatBUS.Create(model);
        }

        [Route("update-hangsanxuat")]
        [HttpPut]
        public bool Update(HangSanXuatModel model)
        {
            return _hangSanXuatBUS.Update(model);
        }

        [Route("delete-hangsanxuat")]
        [HttpDelete]
        public bool Delete([FromBody] List<int> formdata)
        {
            foreach (int id in formdata)
            {
                _hangSanXuatBUS.Delete(id);
            }
            return true;
        }

        [Route("search-hangsanxuat")]
        [HttpPost]
        public IActionResult Search([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                string TenHang = "";
                if (formData.Keys.Contains("TenHang") && !string.IsNullOrEmpty(Convert.ToString(formData["TenHang"]))) { TenHang = Convert.ToString(formData["TenHang"]); }
                long total = 0;
                var data = _hangSanXuatBUS.Search(page, pageSize, out total, TenHang);
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
