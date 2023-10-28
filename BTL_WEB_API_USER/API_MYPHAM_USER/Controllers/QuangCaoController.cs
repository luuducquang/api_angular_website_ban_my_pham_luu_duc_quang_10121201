using BussinessLayer;
using BussinessLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_MYPHAM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuangCaoController : ControllerBase
    {
        private IQuangCaoBUS _quangCaoBUS;

        public QuangCaoController(IQuangCaoBUS quangCaoBUS)
        {
            _quangCaoBUS = quangCaoBUS;
        }

        [Authorize]
        [Route("get-all-quangcao")]
        [HttpGet]
        public IEnumerable<QuangCaoModel> GetDatabAll()
        {
            return _quangCaoBUS.GetDataAll();
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
                var data = _quangCaoBUS.Search(page, pageSize, out total, MoTa);
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
