using BussinessLayer;
using BussinessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_MYPHAM.Controllers
{
    [Authorize(Roles = "1")]
    [Route("api/[controller]")]
    [ApiController]
    public class NhaPhanPhoiController : ControllerBase
    {
        private INhaPhanPhoiBUS _nhaPhanPhoiBUS;

        public NhaPhanPhoiController(INhaPhanPhoiBUS nhaPhanPhoiBUS)
        {
            _nhaPhanPhoiBUS = nhaPhanPhoiBUS;
        }

        [AllowAnonymous]
        [Route("get-all-nhaphanphoi")]
        [HttpGet]
        public IEnumerable<NhaPhanPhoiModel> GetDataAll()
        {
            return _nhaPhanPhoiBUS.GetNhaPhanPhois();
        }

        [Route("create-nhaphanphoi")]
        [HttpPost]
        public bool Create(NhaPhanPhoiModel model)
        {
            return _nhaPhanPhoiBUS.Create(model);
        }

        [Route("update-nhaphanphoi")]
        [HttpPut]
        public bool Update(NhaPhanPhoiModel model)
        {
            return _nhaPhanPhoiBUS.Update(model);
        }

        [Route("delete-nhaphanphoi")]
        [HttpDelete]
        public bool Delete([FromBody] List<int> formdata)
        {
            foreach (int id in formdata)
            {
                _nhaPhanPhoiBUS.Delete(id);
            }
            return true;
        }

        [Route("search-nhaphanphoi")]
        [HttpPost]
        public IActionResult Search([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                string TenNhaPhanPhoi = "";
                if (formData.Keys.Contains("TenNhaPhanPhoi") && !string.IsNullOrEmpty(Convert.ToString(formData["TenNhaPhanPhoi"]))) { TenNhaPhanPhoi = Convert.ToString(formData["TenNhaPhanPhoi"]); }
                string DiaChi = "";
                if (formData.Keys.Contains("DiaChi") && !string.IsNullOrEmpty(Convert.ToString(formData["DiaChi"]))) { DiaChi = Convert.ToString(formData["DiaChi"]); }
                string SDT = "";
                if (formData.Keys.Contains("SDT") && !string.IsNullOrEmpty(Convert.ToString(formData["SDT"]))) { SDT = Convert.ToString(formData["SDT"]); }
                long total = 0;
                var data = _nhaPhanPhoiBUS.Search(page, pageSize, out total, TenNhaPhanPhoi,DiaChi,SDT);
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
