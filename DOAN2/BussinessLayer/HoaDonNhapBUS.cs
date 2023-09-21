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
    public partial class HoaDonNhapBUS : IHoaDonNhapBUS
    {
        private IHoaDonNhapResponsitory _res;

        public HoaDonNhapBUS(IHoaDonNhapResponsitory IHoaDonNhapResponsitory)
        {
            _res = IHoaDonNhapResponsitory;
        }
        public bool Create(HoaDonNhapModel model)
        {
            return _res.Create(model);
        }

        public bool Update(HoaDonNhapModel model)
        {
            return _res.Update(model);
        }

        public List<HoaDonNhapModel> Search(int pageIndex, int pageSize, out long total, string TenSanPham, DateTime? NgayTao)
        {
            return _res.Search(pageIndex, pageSize, out total, TenSanPham, NgayTao);
        }
    }
}
