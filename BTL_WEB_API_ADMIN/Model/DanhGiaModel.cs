using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class DanhGiaModel
    {
        public int MaDanhGia { get; set; }
        public int MaSanPham { get; set; }
        public int MaTaiKhoan { get; set; }
        public string AnhDanhGia { get; set; }
        public float ChatLuong { get; set; }
        public string NoiDung { get; set; }
        public Boolean TrangThai { get; set; }
        public DateTime ThoiGian { get; set; }
        public string GhiChu { get; set; }
        public string? TenSanPham { get; set; }
        public string? HoTen { get; set; }
        public string? TenTaiKhoan { get; set; }
        public string? SoDienThoai { get; set; }
    }
}
