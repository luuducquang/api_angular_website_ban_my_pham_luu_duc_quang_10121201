using BussinessLayer;
using BussinessLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
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

        [Route("thongkedonhanghuytheonam/{nam}")]
        [HttpGet]
        public List<ThongkeKHNamModel> Thongkedonhuynam(int nam)
        {
            return _overviewBUS.Thongkedonhuynam(nam);
        }

        [Route("thongkedonhuyngay")]
        [HttpPost]
        public List<ThongkeKHNgayModel> Thongkedonhuyngay(int Nam, int Thang)
        {
            return _overviewBUS.Thongkedonhuyngay(Nam, Thang);
        }

        [Route("thongkedonhoantratheonam/{nam}")]
        [HttpGet]
        public List<ThongkeKHNamModel> Thongkedonhoantranam(int nam)
        {
            return _overviewBUS.Thongkedonhoantranam(nam);
        }

        [Route("thongkedonhoantrangay")]
        [HttpPost]
        public List<ThongkeKHNgayModel> Thongkedonhoantrangay(int Nam, int Thang)
        {
            return _overviewBUS.Thongkedonhoantrangay(Nam, Thang);
        }

        [Route("thongkedonhoantattheonam/{nam}")]
        [HttpGet]
        public List<ThongkeKHNamModel> Thongkedonhoantatnam(int nam)
        {
            return _overviewBUS.Thongkedonhoantatnam(nam);
        }

        [Route("thongkedonhoantatngay")]
        [HttpPost]
        public List<ThongkeKHNgayModel> Thongkedonhoantatngay(int Nam, int Thang)
        {
            return _overviewBUS.Thongkedonhoantatngay(Nam, Thang);
        }

        [Route("sp-banchaythang")]
        [HttpPost]
        public List<ThongkespbanchaytrongthangModel> Spbanchaythang(int Ngay)
        {
            return _overviewBUS.Spbanchaythang(Ngay);
        }

        [Route("sp-saphet")]
        [HttpGet]
        public List<ThongkespbanchaytrongthangModel> Spsaphet()
        {
            return _overviewBUS.Spsaphet();
        }

        [Route("sp-dabantrongthang")]
        [HttpPost]
        public List<ThongkespbanchaytrongthangModel> Spdabanthang(int Ngay)
        {
            return _overviewBUS.Spdabanthang(Ngay);
        }

        [Route("sp-bancham")]
        [HttpPost]
        public List<ThongkespbanchaytrongthangModel> Spbancham(int Ngay)
        {
            return _overviewBUS.Spbancham(Ngay);
        }

        [Route("thongkedoanhthutheosanpham")]
        [HttpGet]
        public List<DoanhThuTheoSanPham> Thongkedoanhthutheosanpham(int Ngay)
        {
            return _overviewBUS.Thongkedoanhthutheosanpham(Ngay);
        }

        [Route("thongkedanhgia")]
        [HttpGet]
        public List<DanhGiaModel> Thongkedanhgia(int Ngay)
        {
            return _overviewBUS.Thongkedanhgia(Ngay);
        }
    }
}
