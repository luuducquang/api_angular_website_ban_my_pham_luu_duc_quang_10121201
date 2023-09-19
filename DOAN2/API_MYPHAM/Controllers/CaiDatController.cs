using BussinessLayer.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_MYPHAM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CaiDatController : ControllerBase
    {
        private ICaidatBUS _caidatBUS;
        
        public CaiDatController(ICaidatBUS caidatBUS)
        {
            _caidatBUS = caidatBUS;
        }

        [Route("get_all_caidat")]
        [HttpGet]
        public IActionResult GetAllCaidat()
        {
            return Ok(_caidatBUS.GetAllCaidat());
        }

        [Route("create_caidat")]
        [HttpPost]
        public IActionResult Create(CaidatModel model)
        {
            return Ok(_caidatBUS.Create(model));
        }

        [Route("update_caidat")]
        [HttpPut]
        public IActionResult Update(CaidatModel model)
        {
            return Ok(_caidatBUS.Update(model));
        }

        [Route("Delete_caidat")]
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            return Ok(_caidatBUS.Delete(id));
        }
    }
}
