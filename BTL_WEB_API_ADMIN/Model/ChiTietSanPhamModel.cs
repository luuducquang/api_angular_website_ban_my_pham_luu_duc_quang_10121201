using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class ChiTietSanPhamModel
    {
        public int MaChiTietSanPham { get; set; }
        public int MaSanPham { get; set; }
        public int MaNhaSanXuat { get; set; }
        public string MoTa { get; set; }
        public string ChiTiet { get; set; }
        public int status { get; set; }
    }
}
