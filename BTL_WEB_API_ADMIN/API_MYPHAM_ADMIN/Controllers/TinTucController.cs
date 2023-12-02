using BussinessLayer;
using BussinessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_MYPHAM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TinTucController : ControllerBase
    {
        private ITinTucBUS _tinTucBUS;

        public TinTucController(ITinTucBUS tinTucBUS)
        {
            _tinTucBUS = tinTucBUS;
        }

        [AllowAnonymous]
        [Route("getbyid-tintuc/{id}")]
        [HttpGet]
        public TinTucsModel GetByID(int id)
        {
            return _tinTucBUS.Getbyid(id);
        }

        [Authorize]
        [Route("create-tintuc")]
        [HttpPost]
        public IActionResult Createtintuc([FromBody]TinTucsModel tintuc)
        {
            return Ok(_tinTucBUS.Create(tintuc));
        }

        [Authorize]
        [Route("update-tintuc")]
        [HttpPut]
        public IActionResult UpdateTin([FromBody] TinTucsModel tintuc)
        {
            return Ok(_tinTucBUS.Update(tintuc));
        }

        [Route("delete-tintuc")]
        [HttpDelete]
        public IActionResult DeleteTin([FromBody] List<int> formData)
        {
            foreach (var data in formData)
            {
                _tinTucBUS.Delete(data);
            }
            return Ok();
        }

        [AllowAnonymous]
        [Route("search-tintuc")]
        [HttpPost]
        public IActionResult Search([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                string TieuDe = "";
                if (formData.Keys.Contains("TieuDe") && !string.IsNullOrEmpty(Convert.ToString(formData["TieuDe"]))) { TieuDe = Convert.ToString(formData["TieuDe"]); }
                string TrangThai = "";
                if (formData.Keys.Contains("TrangThai") && !string.IsNullOrEmpty(Convert.ToString(formData["TrangThai"]))) { TieuDe = Convert.ToString(formData["TrangThai"]); }
                long total = 0;
                var data = _tinTucBUS.Search(page, pageSize, out total,  TieuDe, TrangThai);
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
