using BussinessLayer;
using BussinessLayer.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_MYPHAM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HangSanXuatController : ControllerBase
    {
        private IHangSanXuatBUS _hangSanXuatBUS;

        public HangSanXuatController(IHangSanXuatBUS hangSanXuatBUS)
        {
            _hangSanXuatBUS = hangSanXuatBUS;
        }

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
        public bool Delete(int mahsx)
        {
            return _hangSanXuatBUS.Delete(mahsx);
        }
    }
}
