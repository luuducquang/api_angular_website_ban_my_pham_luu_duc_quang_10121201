using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer.Interfaces
{
    public partial interface IOverviewBUS
    {
        OverViewModel Tongquan();
        List<ThongketheonamModel> Thongkenam(int Nam);
        List<ThongketienchitheonamModel> Thongketienchinam(int Nam);
        List<ThongkedoanhthungayModel> Thongkedoanhthungay(int Nam, int Thang);
        List<ThongketienchingayModel> Thongketienchingay(int Nam, int Thang);
        List<ThongkeHDBNamModel> Thongkehdbnam(int Nam);
        List<ThongkeHDBNgayModel> Thongkehdbngay(int Nam, int Thang);
        List<ThongkeHDNNamModel> Thongkehdnnam(int Nam);
        List<ThongkeHDNNgayModel> Thongkehdnngay(int Nam, int Thang);
        List<ThongkeKHNamModel> Thongkekhnam(int Nam);
        List<ThongkeKHNgayModel> Thongkekhngay(int Nam, int Thang);
        List<ThongkeKHNamModel> Thongkedonhuynam(int Nam);
        List<ThongkeKHNgayModel> Thongkedonhuyngay(int Nam, int Thang);
        List<ThongkeKHNamModel> Thongkedonhoantranam(int Nam);
        List<ThongkeKHNgayModel> Thongkedonhoantrangay(int Nam, int Thang);
        List<ThongkeKHNamModel> Thongkedonhoantatnam(int Nam);
        List<ThongkeKHNgayModel> Thongkedonhoantatngay(int Nam, int Thang);
        List<ThongkespbanchaytrongthangModel> Spbanchaythang(int Ngay);
        List<ThongkespbanchaytrongthangModel> Spsaphet();
        List<ThongkespbanchaytrongthangModel> Spdabanthang(int Ngay);
        List<ThongkespbanchaytrongthangModel> Spbancham(int Ngay);
        List<DoanhThuTheoSanPham> Thongkedoanhthutheosanpham(int Ngay);
        List<DanhGiaModel> Thongkedanhgia(int Ngay);

    }
}
