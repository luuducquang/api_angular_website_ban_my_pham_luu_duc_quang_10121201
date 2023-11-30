using BussinessLayer;
using BussinessLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using System.Reflection;

namespace API_MYPHAM.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TaiKhoanController : ControllerBase
    {
        private ITaiKhoanBUS _taiKhoanBUS;

        public TaiKhoanController(ITaiKhoanBUS taiKhoanBUS)
        {
            _taiKhoanBUS = taiKhoanBUS;
        }

        [AllowAnonymous]
        [Route("get-alltaikhoan")]
        [HttpGet]
        public IEnumerable<TaiKhoanModel> GetDataAll()
        {
            return _taiKhoanBUS.Getalltaikhoan();
        }

        [Route("getbyid-taikhoan-chitiettaikhoan/{id}")]
        [HttpGet]
        public List<ChiTietTaiKhoanModelTWO> GetByID(int id)
        {
            return _taiKhoanBUS.Getbyids(id);
        }
        [AllowAnonymous]
        [Route("create-taikhoan")]
        [HttpPost]
        public TaiKhoanModel CreateTaikhoan([FromBody] TaiKhoanModel model)
        {
            _taiKhoanBUS.Create(model);
            return model;
        }

        [Route("update-taikhoan")]
        [HttpPut]
        public TaiKhoanModel UpdateTaiKhoan([FromBody] TaiKhoanModel model)
        {
            _taiKhoanBUS.Update(model);
            return model;
        }

        [Route("doimk-taikhoan")]
        [HttpPut]
        public DoimkModel Doimatkhau([FromBody] DoimkModel model)
        {
            _taiKhoanBUS.Doimk(model);
            return model;
        }

    }
}
