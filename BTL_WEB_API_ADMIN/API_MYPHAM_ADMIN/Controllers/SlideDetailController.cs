using BussinessLayer;
using BussinessLayer.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_MYPHAM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlideDetailController : ControllerBase
    {
        private ISlideDetailBUS _slideDetailBUS;

        public SlideDetailController(ISlideDetailBUS slideDetailBUS)
        {
            _slideDetailBUS = slideDetailBUS;
        }

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

    }
}
