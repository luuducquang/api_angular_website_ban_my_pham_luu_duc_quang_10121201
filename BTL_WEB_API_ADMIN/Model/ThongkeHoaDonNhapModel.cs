using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class ThongkeHoaDonNhapModel
    {
        public int MaHoaDon {  get; set; }
        public int MaSanPham {  get; set; }
        public string TenNhaPhanPhoi {  get; set; }
        public string TenSanPham {  get; set; }
        public int SoLuong {  get; set; }
        public string DonViTinh {  get; set; }
        public Decimal GiaNhap {  get; set; }
        public Decimal TongTien {  get; set; }
        public DateTime NgayTao {  get; set; }
        public string KieuThanhToan {  get; set; }
        public int MaTaiKhoan {  get; set; }
    }
}
