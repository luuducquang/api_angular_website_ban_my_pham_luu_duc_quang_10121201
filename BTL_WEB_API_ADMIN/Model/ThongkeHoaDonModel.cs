using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class ThongkeHoaDonModel
    {
        public int MaHoaDon { get; set; }
        public DateTime NgayTao { get; set; }
        public DateTime NgayDuyet { get; set; }
        public string TenKH { get; set; }
        public string SDT { get; set; }
        public string DiaChiGiaoHang { get; set; }
        public string TenSanPham { get; set; }
        public int MaSanPham { get; set; }
        public int SoLuong { get; set; }
        public Decimal TongGia { get; set; }
    }
}
