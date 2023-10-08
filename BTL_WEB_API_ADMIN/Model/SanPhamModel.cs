using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class SanPhamModel
    {
        public int MaSanPham { get; set; }
        public int MaDanhMuc { get; set; }
        public int Madanhmucuudai { get; set; }
        public string TenSanPham { get; set; }
        public string AnhDaiDien { get; set; }
        public Decimal Gia { get; set; }
        public Decimal GiaGiam { get; set; }
        public int SoLuong { get; set; }
        public bool TrangThai { get; set; }
        public int LuotXem { get; set; }
        public List<ChiTietSanPhamModel> list_json_chitiet_sanpham { get; set; }
        public List<SanPham_NhaPhanPhoiModel> list_json_sanpham_nhaphanphoi { get; set; }
        public List<AnhSanPhamModel> list_json_anhsanpham { get; set; }

    }
}
