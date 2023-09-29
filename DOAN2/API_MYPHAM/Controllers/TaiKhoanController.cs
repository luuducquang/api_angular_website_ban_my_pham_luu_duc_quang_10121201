using BussinessLayer;
using BussinessLayer.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using System.Reflection;

namespace API_MYPHAM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaiKhoanController : ControllerBase
    {
        private ITaiKhoanBUS _taiKhoanBUS;

        public TaiKhoanController(ITaiKhoanBUS taiKhoanBUS)
        {
            _taiKhoanBUS = taiKhoanBUS;
        }

        [Route("create-taikhoan")]
        [HttpPost]
        public TaiKhoanModel CreateTaikhoan([FromBody] TaiKhoanModel model)
        {
            _taiKhoanBUS.Create(model);
            return model;
        }

        [Route("doimk-taikhoan")]
        [HttpPut]
        public DoimkModel Doimatkhau([FromBody] DoimkModel model)
        {
            _taiKhoanBUS.Doimk(model);
            return model;
        }

        [Route("delete-taikhoan")]
        [HttpDelete]
        public bool DeleteTaiKhoan([FromBody] int MaTaiKhoan)
        {
            return _taiKhoanBUS.Delete(MaTaiKhoan);
        }

    }
}
