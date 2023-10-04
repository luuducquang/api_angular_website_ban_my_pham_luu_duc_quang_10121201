using BussinessLayer;
using BussinessLayer.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_MYPHAM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhMucUuDaiController : ControllerBase
    {
        private IDanhMucUuDaiBUS _danhMucUuDaiBUS;

        public DanhMucUuDaiController(IDanhMucUuDaiBUS danhMucUuDai)
        {
            _danhMucUuDaiBUS = danhMucUuDai;
        }

        [Route("get-all-danhmucuudai")]
        [HttpGet]
        public IEnumerable<DanhmucUuudaisModel> GetDataAll()
        {
            return _danhMucUuDaiBUS.GetAllDanhmucUuudais();
        }

        
        [Route("search-danhmucuudai")]
        [HttpPost]
        public IActionResult Search([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                string Tendanhmucuudai = "";
                if (formData.Keys.Contains("Tendanhmucuudai") && !string.IsNullOrEmpty(Convert.ToString(formData["Tendanhmucuudai"]))) { Tendanhmucuudai = Convert.ToString(formData["Tendanhmucuudai"]); }
                long total = 0;
                var data = _danhMucUuDaiBUS.Search(page, pageSize, out total, Tendanhmucuudai);
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
