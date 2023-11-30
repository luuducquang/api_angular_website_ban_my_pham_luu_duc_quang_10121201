using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class OverViewModel
    {
        public int SoluongHoaDonNhap { get; set; }
        public int SoluongHoaDonBan { get; set; }
        public int SoLuongHoaDonHuy { get; set; }
        public int SoLuongHoaDonCho { get; set; }
        public int SoLuongHoaDonDangGiao { get; set; }
        public int SoLuongHoaDonDaGiao { get; set; }
        public int SoLuongHoaDonDoiTra { get; set; }
        public int KhachHangMua { get; set; }
        public int KhachHangMoi { get; set; }
        public int TienChi { get; set; }
        public int DoanhThu { get; set; }
        public int LuotXem { get; set; }
    }

    public class ThongketheonamModel
    {
        public int Thang { get; set; }
        public Double DoanhThu { get; set; }
    }

    public class ThongketienchitheonamModel
    {
        public int Thang { get; set; }
        public Double TienChi { get; set; }
    }

    public class ThongkedoanhthungayModel
    {
        public DateTime Ngay { get; set; }
        public Double DoanhThu { get; set; }
    }

    public class ThongketienchingayModel
    {
        public DateTime Ngay { get; set; }
        public Double TienChi { get; set; }
    }

    public class ThongkeHDBNamModel
    {
        public int Thang { get; set; }
        public int SL { get; set; }
    }

    public class ThongkeHDBNgayModel
    {
        public DateTime Ngay { get; set; }
        public int SL { get; set; }
    }

    public class ThongkeHDNNamModel
    {
        public int Thang { get; set; }
        public int SL { get; set; }
    }

    public class ThongkeHDNNgayModel
    {
        public DateTime Ngay { get; set; }
        public int SL { get; set; }
    }

    public class ThongkeKHNamModel
    {
        public int Thang { get; set; }
        public int SL { get; set; }
    }

    public class ThongkeKHNgayModel
    {
        public DateTime Ngay { get; set; }
        public int SL { get; set; }
    }

    public class ThongkespbanchaytrongthangModel
    {
        public int MaSanPham { get; set; }
        public string TenSanPham { get; set; }
        public string AnhDaiDien { get; set; }
        public Decimal Gia { get; set; }
        public Decimal GiaGiam { get; set; }
        public string TrongLuong { get; set; }
        public string Tendanhmucuudai { get; set; }
        public string TenDanhMuc { get; set; }
        public int soluong { get; set; }
        public int LuotBan { get; set; }
        public float DanhGia { get; set; }
    }

    public class DoanhThuTheoSanPham
    {
        public string TenSanPham { get; set; }
        public Decimal DoanhThu { get; set; }
        public int SoLuong { get; set; }
    }

}
