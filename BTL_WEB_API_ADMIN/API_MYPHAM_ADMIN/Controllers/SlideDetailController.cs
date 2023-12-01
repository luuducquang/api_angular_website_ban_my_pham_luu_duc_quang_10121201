using BussinessLayer;
using BussinessLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_MYPHAM.Controllers
{
    [Authorize(Roles = "1,8")]
    [Route("api/[controller]")]
    [ApiController]
    public class SlideDetailController : ControllerBase
    {
        private ISlideDetailBUS _slideDetailBUS;

        public SlideDetailController(ISlideDetailBUS slideDetailBUS)
        {
            _slideDetailBUS = slideDetailBUS;
        }

        [AllowAnonymous]
        [Route("get-all-slide")]
        [HttpGet]
        public IEnumerable<SlideDetailModel> GetDatabAll()
        {
            return _slideDetailBUS.GetAllSlide();
        }

        [Route("create-slide_detail")]
        [HttpPost]
        public IActionResult Create([FromBody] SlideDetailModel model)
        {
            return Ok(_slideDetailBUS.Create(model));
        }

        [Route("update-slide_detail")]
        [HttpPut]
        public IActionResult Update([FromBody] SlideDetailModel model)
        {
            return Ok(_slideDetailBUS.Update(model));
        }

        [Route("delete-slide_detail")]
        [HttpDelete]
        public IActionResult Delete([FromBody] List<int>MaAnhs)
        {
            foreach (int i in MaAnhs)
            {
                _slideDetailBUS.Delete(i);
            }
            return Ok();
        }

        [Route("search-slide")]
        [HttpPost]
        public IActionResult Search([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                string TieuDe = "";
                if (formData.Keys.Contains("TieuDe") && !string.IsNullOrEmpty(Convert.ToString(formData["TieuDe"]))) { TieuDe = Convert.ToString(formData["TieuDe"]); }
                long total = 0;
                var data = _slideDetailBUS.Search(page, pageSize, out total, TieuDe);
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
