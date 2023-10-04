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

    }
}
