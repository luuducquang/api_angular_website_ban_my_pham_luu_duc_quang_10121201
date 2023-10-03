using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class AnhSanPhamModel
    {
        public int Id { get; set; }
        public int MaSanPham { get; set; }
        public string? LinkAnh { get; set; }
        public int status { get; set; }
    }
}
