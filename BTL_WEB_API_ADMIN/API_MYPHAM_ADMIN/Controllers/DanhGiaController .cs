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
    public class DanhGiaController : ControllerBase
    {
        private IDanhGiaBUS _danhGiaBUS;

        public DanhGiaController(IDanhGiaBUS danhGiaBUS)
        {
            _danhGiaBUS = danhGiaBUS;
        }

        [AllowAnonymous]
        [Route("search-danhgia")]
        [HttpPost]
        public IActionResult Search([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                int MaSanPham = 0;
                if (formData.ContainsKey("MaSanPham") && !string.IsNullOrEmpty(formData["MaSanPham"].ToString()))
                {
                    if (int.TryParse(formData["MaSanPham"].ToString(), out int MaSP))
                    {
                        MaSanPham = MaSP;
                    }
                }
                int ChatLuong = 0;
                if (formData.ContainsKey("ChatLuong") && !string.IsNullOrEmpty(formData["ChatLuong"].ToString()))
                {
                    if (int.TryParse(formData["ChatLuong"].ToString(), out int CL))
                    {
                        ChatLuong = CL;
                    }
                }
                string NoiDung = "";
                if (formData.Keys.Contains("NoiDung") && !string.IsNullOrEmpty(Convert.ToString(formData["NoiDung"]))) { NoiDung = Convert.ToString(formData["NoiDung"]); }
                DateTime? fr_NgayTao = null;
                if (formData.Keys.Contains("fr_NgayTao") && formData["fr_NgayTao"] != null && formData["fr_NgayTao"].ToString() != "")
                {
                    var dt = Convert.ToDateTime(formData["fr_NgayTao"].ToString());
                    fr_NgayTao = new DateTime(dt.Year, dt.Month, dt.Day, 0, 0, 0, 0);
                }
                DateTime? to_NgayTao = null;
                if (formData.Keys.Contains("to_NgayTao") && formData["to_NgayTao"] != null && formData["to_NgayTao"].ToString() != "")
                {
                    var dt = Convert.ToDateTime(formData["to_NgayTao"].ToString());
                    to_NgayTao = new DateTime(dt.Year, dt.Month, dt.Day, 23, 59, 59, 999);
                }
                long total = 0;
                var data = _danhGiaBUS.Getbyids(page, pageSize, out total, MaSanPham,ChatLuong,NoiDung,fr_NgayTao,to_NgayTao);
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

        [Route("create-danhgia")]
        [HttpPost]
        public DanhGiaModel CreateDanhGia([FromBody] DanhGiaModel model)
        {
            _danhGiaBUS.Create(model);
            return model;
        }

        [Route("update-danhgia")]
        [HttpPost]
        public DanhGiaModel UpdateDanhGia([FromBody] DanhGiaModel model)
        {
            _danhGiaBUS.Update(model);
            return model;
        }

        [Route("delete-danhgia")]
        [HttpDelete]
        public bool Delete([FromBody] List<int> formdata)
        {
            foreach (int id in formdata)
            {
                _danhGiaBUS.Delete(id);
            }
            return true;
        }
    }
}
