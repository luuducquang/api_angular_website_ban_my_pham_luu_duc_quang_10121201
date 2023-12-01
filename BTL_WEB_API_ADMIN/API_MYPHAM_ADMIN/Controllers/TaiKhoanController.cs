using BussinessLayer;
using BussinessLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using System.Reflection;

namespace API_MYPHAM.Controllers
{
    [Authorize(Roles = "8")]
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
        [Route("getbyid-taikhoan-chitiettaikhoan/{id}")]
        [HttpGet]
        public List<ChiTietTaiKhoanModelTWO> GetByID(int id)
        {
            return _taiKhoanBUS.Getbyids(id);
        }

        [AllowAnonymous]
        [Route("get-alltaikhoan")]
        [HttpGet]
        public IEnumerable<TaiKhoanModel> GetDataAll()
        {
            return _taiKhoanBUS.Getalltaikhoan();
        }

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

        [Route("delete-taikhoan")]
        [HttpDelete]
        public bool Delete([FromBody] List<int> formdata)
        {
            foreach (int id in formdata)
            {
                _taiKhoanBUS.Delete(id);
            }
            return true;
        }

        [Route("search-taikhoan")]
        [HttpPost]
        public IActionResult Search([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                string TenTaiKhoan = "";
                if (formData.Keys.Contains("TenTaiKhoan") && !string.IsNullOrEmpty(Convert.ToString(formData["TenTaiKhoan"]))) { TenTaiKhoan = Convert.ToString(formData["TenTaiKhoan"]); }
                string Email = "";
                if (formData.Keys.Contains("Email") && !string.IsNullOrEmpty(Convert.ToString(formData["Email"]))) { Email = Convert.ToString(formData["Email"]); }
                string HoTen = "";
                if (formData.Keys.Contains("HoTen") && !string.IsNullOrEmpty(Convert.ToString(formData["HoTen"]))) { HoTen = Convert.ToString(formData["HoTen"]); }
                string SoDienThoai = "";
                if (formData.Keys.Contains("SoDienThoai") && !string.IsNullOrEmpty(Convert.ToString(formData["SoDienThoai"]))) { SoDienThoai = Convert.ToString(formData["SoDienThoai"]); }
                long total = 0;
                var data = _taiKhoanBUS.Search(page, pageSize, out total, TenTaiKhoan, Email, HoTen, SoDienThoai);
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

        [Route("search-taikhoansingle")]
        [HttpPost]
        public IActionResult SearchSingle([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                string TenTaiKhoan = "";
                if (formData.Keys.Contains("TenTaiKhoan") && !string.IsNullOrEmpty(Convert.ToString(formData["TenTaiKhoan"]))) { TenTaiKhoan = Convert.ToString(formData["TenTaiKhoan"]); }
                long total = 0;
                var data = _taiKhoanBUS.SearchSingle(page, pageSize, out total, TenTaiKhoan);
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
