using BussinessLayer;
using BussinessLayer.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_MYPHAM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhMucController : ControllerBase
    {
        private IDanhMucBUS _danhMucBUS;

        public DanhMucController(IDanhMucBUS danhMuc)
        {
            _danhMucBUS = danhMuc;
        }

        [Route("get-all-danhmuc")]
        [HttpGet]
        public IEnumerable<DanhMucModel> GetDataAll()
        {
            return _danhMucBUS.GetAllDanhmucs();
        }

        [Route("create-danhmuc")]
        [HttpPost]
        public IActionResult Create(DanhMucModel model)
        {
            return Ok(_danhMucBUS.Create(model));
        }

        [Route("update-danhmuc")]
        [HttpPut]
        public IActionResult Update(DanhMucModel model)
        {
            return Ok(_danhMucBUS.Update(model));
        }

        [Route("delete-danhmuc")]
        [HttpPut]
        public bool Delete(int madanhmuc)
        {
            return _danhMucBUS.Delete(madanhmuc);
        }


    }
}
