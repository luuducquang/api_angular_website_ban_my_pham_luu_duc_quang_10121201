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
    public class QuangCaoController : ControllerBase
    {
        private IQuangCaoBUS _quangCaoBUS;

        public QuangCaoController(IQuangCaoBUS quangCaoBUS)
        {
            _quangCaoBUS = quangCaoBUS;
        }

        [AllowAnonymous]
        [Route("get-all-quangcao")]
        [HttpGet]
        public IEnumerable<QuangCaoModel> GetDatabAll()
        {
            return _quangCaoBUS.GetDataAll();
        }

        [Route("create-quangcao")]
        [HttpPost]
        public IActionResult CreateQuangCao([FromBody]QuangCaoModel quangCao)
        {
            return Ok(_quangCaoBUS.Create(quangCao));
        }

        [Route("update-quangcao")]
        [HttpPut]
        public IActionResult UpdateQuangCao([FromBody] QuangCaoModel quangCao)
        {
            return Ok(_quangCaoBUS.Update(quangCao));
        }

        [Route("delete-quangcao")]
        [HttpDelete]
        public IActionResult DeleteQuangcao([FromBody] Dictionary<string, int>[] formData)
        {
            foreach (var form in formData)
            {
                int a = 0;
                if (form.Keys.Contains("Id") && !string.IsNullOrEmpty(Convert.ToString(form["Id"]))) { a = Convert.ToInt32(form["Id"]); }
                _quangCaoBUS.Delete(a);
            }
            return Ok();
        }

        [Route("delete-quangcao2")]
        [HttpDelete]
        public IActionResult DeleteQuangcao2([FromBody] List<int> formData)
        {
            foreach (var data in formData)
            {
                _quangCaoBUS.Delete(data);
            }
            return Ok();
        }

        [Route("search-quangcao")]
        [HttpPost]
        public IActionResult Search([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                string MoTa = "";
                if (formData.Keys.Contains("MoTa") && !string.IsNullOrEmpty(Convert.ToString(formData["MoTa"]))) { MoTa = Convert.ToString(formData["MoTa"]); }
                long total = 0;
                var data = _quangCaoBUS.Search(page, pageSize, out total,  MoTa);
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
