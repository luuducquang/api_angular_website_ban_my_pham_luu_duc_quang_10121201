using BussinessLayer;
using BussinessLayer.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_MYPHAM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhachHangController : ControllerBase
    {
        private IKhachHangBUS _KhachHangBUS;

        public KhachHangController(IKhachHangBUS khachHangBUS)
        {
            _KhachHangBUS = khachHangBUS;
        }

        [Route("/create-khachhang")]
        [HttpPost]
        public KhachHangModel CreateKhachHang([FromBody]KhachHangModel model)
        {
            _KhachHangBUS.Create(model);
            return model;
        }

        [Route("/sua-khachhang")]
        [HttpPut]
        public KhachHangModel UpdateKhachHang([FromBody] KhachHangModel model)
        {
            _KhachHangBUS.Update(model);
            return model;
        }

        [Route("/xoa-khachhang")]
        [HttpDelete]
        public IActionResult DeleteKhachHang([FromBody] int id)
        {
            _KhachHangBUS.Delete(id);
            return Ok();
        }


        [Route("get-all-khachhang")]
        [HttpDelete]
        public IEnumerable<KhachHangModel> GetDatabAll()
        {
            return _KhachHangBUS.GetDataAll();
        }

        [Route("search-khach-hang")]
        [HttpPost]
        public IActionResult Search([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                string tenkh = "";
                if (formData.Keys.Contains("tenkh") && !string.IsNullOrEmpty(Convert.ToString(formData["tenkh"]))) { tenkh = Convert.ToString(formData["tenkh"]); }
                string diachi = "";
                if (formData.Keys.Contains("diachi") && !string.IsNullOrEmpty(Convert.ToString(formData["diachi"]))) { diachi = Convert.ToString(formData["diachi"]); }
                long total = 0;
                var data = _KhachHangBUS.Search(page, pageSize, out total, tenkh, diachi);
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
