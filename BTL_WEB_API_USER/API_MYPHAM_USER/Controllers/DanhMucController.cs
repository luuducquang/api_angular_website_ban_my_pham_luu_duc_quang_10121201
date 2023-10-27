using BussinessLayer;
using BussinessLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.SqlServer.Server;
using Model;

namespace API_MYPHAM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhMucController : ControllerBase
    {
        private IDanhMucBUS _danhMucBUS;

        public DanhMucController(IDanhMucBUS danhMuc)
        {
            _danhMucBUS = danhMuc;
        }

        [Route("get-all-danhmuc")]
        [HttpGet]
        public IEnumerable<DanhMucModel> GetDataAll()
        {
            return _danhMucBUS.GetAllDanhmucs();
        }


        [Route("search-danhmuc")]
        [HttpPost]
        public IActionResult Search([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                string TenDanhMuc = "";
                if (formData.Keys.Contains("TenDanhMuc") && !string.IsNullOrEmpty(Convert.ToString(formData["TenDanhMuc"]))) { TenDanhMuc = Convert.ToString(formData["TenDanhMuc"]); }
                long total = 0;
                var data = _danhMucBUS.Search(page, pageSize, out total, TenDanhMuc);
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
