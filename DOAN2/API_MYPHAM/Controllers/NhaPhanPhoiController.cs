using BussinessLayer;
using BussinessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_MYPHAM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NhaPhanPhoiController : ControllerBase
    {
        private INhaPhanPhoiBUS _nhaPhanPhoiBUS;

        public NhaPhanPhoiController(INhaPhanPhoiBUS nhaPhanPhoiBUS)
        {
            _nhaPhanPhoiBUS = nhaPhanPhoiBUS;
        }

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
        public bool Delete(int manhaphanphoi)
        {
            return _nhaPhanPhoiBUS.Delete(manhaphanphoi);
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
                long total = 0;
                var data = _nhaPhanPhoiBUS.Search(page, pageSize, out total, TenNhaPhanPhoi);
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
