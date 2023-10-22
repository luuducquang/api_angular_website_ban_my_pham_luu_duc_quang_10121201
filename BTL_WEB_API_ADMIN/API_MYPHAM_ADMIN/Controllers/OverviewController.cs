using BussinessLayer;
using BussinessLayer.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_MYPHAM_ADMIN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OverviewController : ControllerBase
    {
        private IOverviewBUS _overviewBUS;

        public OverviewController(IOverviewBUS tutorialBUS)
        {
            _overviewBUS = tutorialBUS;
        }

        [Route("tong-quan")]
        [HttpGet]
        public OverViewModel Tongquan()
        {
            return _overviewBUS.Tongquan();
        }

        [Route("thongkedoanhthutheonam/{nam}")]
        [HttpGet]
        public List<ThongketheonamModel> Thongkenam(int nam)
        {
            return _overviewBUS.Thongkenam(nam);
        }

        [Route("thongketienchitheonam/{nam}")]
        [HttpGet]
        public List<ThongketienchitheonamModel> Thongketienchinam(int nam)
        {
            return _overviewBUS.Thongketienchinam(nam);
        }

        [Route("thongkedoanhthungay")]
        [HttpPost]
        public List<ThongkedoanhthungayModel> Thongkedoanhthutheongay(int Nam, int Thang)
        {
            return _overviewBUS.Thongkedoanhthungay(Nam,Thang);
        }

        [Route("thongketienchingay")]
        [HttpPost]
        public List<ThongketienchingayModel> Thongketienchingay(int Nam, int Thang)
        {
            return _overviewBUS.Thongketienchingay(Nam, Thang);
        }

        [Route("thongkehoadonbantheonam/{nam}")]
        [HttpGet]
        public List<ThongkeHDBNamModel> Thongkehdbnam(int nam)
        {
            return _overviewBUS.Thongkehdbnam(nam);
        }

        [Route("thongkehdbngay")]
        [HttpPost]
        public List<ThongkeHDBNgayModel> Thongkehdbngay(int Nam, int Thang)
        {
            return _overviewBUS.Thongkehdbngay(Nam, Thang);
        }

        [Route("thongkehoadonnhaptheonam/{nam}")]
        [HttpGet]
        public List<ThongkeHDNNamModel> Thongkehdnnam(int nam)
        {
            return _overviewBUS.Thongkehdnnam(nam);
        }

        [Route("thongkehdnngay")]
        [HttpPost]
        public List<ThongkeHDNNgayModel> Thongkehdnngay(int Nam, int Thang)
        {
            return _overviewBUS.Thongkehdnngay(Nam, Thang);
        }

        [Route("thongkekhachhangtheonam/{nam}")]
        [HttpGet]
        public List<ThongkeKHNamModel> Thongkekhnam(int nam)
        {
            return _overviewBUS.Thongkekhnam(nam);
        }

        [Route("thongkekhngay")]
        [HttpPost]
        public List<ThongkeKHNgayModel> Thongkekhngay(int Nam, int Thang)
        {
            return _overviewBUS.Thongkekhngay(Nam, Thang);
        }

        [Route("sp-banchaythang")]
        [HttpGet]
        public List<ThongkespbanchaytrongthangModel> Spbanchaythang()
        {
            return _overviewBUS.Spbanchaythang();
        }

        [Route("sp-saphet")]
        [HttpGet]
        public List<ThongkespbanchaytrongthangModel> Spsaphet()
        {
            return _overviewBUS.Spsaphet();
        }
    }
}
