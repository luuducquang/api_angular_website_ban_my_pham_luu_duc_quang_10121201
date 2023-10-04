using BussinessLayer;
using BussinessLayer.Interfaces;
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

        [Route("get-all-quangcao")]
        [HttpGet]
        public IEnumerable<QuangCaoModel> GetDatabAll()
        {
            return _quangCaoBUS.GetDataAll();
        }

    }
}
