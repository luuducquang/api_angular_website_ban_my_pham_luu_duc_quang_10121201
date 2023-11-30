using BussinessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer
{
    public partial class OverviewBUS: IOverviewBUS
    {
        public IOverviewResponsitory _res;

        public OverviewBUS(IOverviewResponsitory tutorialResponsitory)
        {
            _res = tutorialResponsitory;
        }

        public OverViewModel Tongquan()
        {
            return _res.Tongquan();
        }
        public List<ThongketheonamModel> Thongkenam(int nam)
        {
            return _res.Thongkenam(nam);
        }
        public List<ThongketienchitheonamModel> Thongketienchinam(int nam)
        {
            return _res.Thongketienchinam(nam);
        }

        public List<ThongkedoanhthungayModel> Thongkedoanhthungay(int Nam,int Thang)
        {
            return _res.Thongkedoanhthungay(Nam,Thang);
        }

        public List<ThongketienchingayModel> Thongketienchingay(int Nam, int Thang)
        {
            return _res.Thongketienchingay(Nam, Thang);
        }
        public List<ThongkeHDBNamModel> Thongkehdbnam(int nam)
        {
            return _res.Thongkehdbnam(nam);
        }
        public List<ThongkeHDBNgayModel> Thongkehdbngay(int Nam, int Thang)
        {
            return _res.Thongkehdbngay(Nam, Thang);
        }

        public List<ThongkeHDNNamModel> Thongkehdnnam(int nam)
        {
            return _res.Thongkehdnnam(nam);
        }
        public List<ThongkeHDNNgayModel> Thongkehdnngay(int Nam, int Thang)
        {
            return _res.Thongkehdnngay(Nam, Thang);
        }
        public List<ThongkeKHNamModel> Thongkekhnam(int nam)
        {
            return _res.Thongkekhnam(nam);
        }
        public List<ThongkeKHNgayModel> Thongkekhngay(int Nam, int Thang)
        {
            return _res.Thongkekhngay(Nam, Thang);
        }
        public List<ThongkeKHNamModel> Thongkedonhuynam(int nam)
        {
            return _res.Thongkedonhuynam(nam);
        }
        public List<ThongkeKHNgayModel> Thongkedonhuyngay(int Nam, int Thang)
        {
            return _res.Thongkedonhuyngay(Nam, Thang);
        }
        public List<ThongkeKHNamModel> Thongkedonhoantranam(int nam)
        {
            return _res.Thongkedonhoantranam(nam);
        }
        public List<ThongkeKHNgayModel> Thongkedonhoantrangay(int Nam, int Thang)
        {
            return _res.Thongkedonhoantrangay(Nam, Thang);
        }
        public List<ThongkeKHNamModel> Thongkedonhoantatnam(int nam)
        {
            return _res.Thongkedonhoantatnam(nam);
        }
        public List<ThongkeKHNgayModel> Thongkedonhoantatngay(int Nam, int Thang)
        {
            return _res.Thongkedonhoantatngay(Nam, Thang);
        }
        public List<ThongkespbanchaytrongthangModel> Spbanchaythang(int Ngay)
        {
            return _res.Spbanchaythang(Ngay);
        }
        public List<ThongkespbanchaytrongthangModel> Spsaphet()
        {
            return _res.Spsaphet();
        }
        public List<ThongkespbanchaytrongthangModel> Spdabanthang(int Ngay)
        {
            return _res.Spdabanthang(Ngay);
        }
        public List<ThongkespbanchaytrongthangModel> Spbancham(int Ngay)
        {
            return _res.Spbancham(Ngay);
        }
        public List<DoanhThuTheoSanPham> Thongkedoanhthutheosanpham(int Ngay)
        {
            return _res.Thongkedoanhthutheosanpham(Ngay);
        }

        public List<DanhGiaModel> Thongkedanhgia(int Ngay)
        {
            return _res.Thongkedanhgia(Ngay);
        }
    }
}
