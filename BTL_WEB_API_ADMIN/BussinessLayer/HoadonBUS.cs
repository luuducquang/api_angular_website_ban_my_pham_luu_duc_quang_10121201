using BussinessLayer.Interfaces;
using DataAccessLayer;
using DataAccessLayer.Interfaces;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer
{
    public partial class HoaDonBUS : IHoaDonBUS
    {
        public IHoaDonResponsitory _res;

        public HoaDonBUS(IHoaDonResponsitory IHoaDonResponsitory)
        {
            _res = IHoaDonResponsitory;
        }
        public bool Create(HoaDonModel model)
        {
            return _res.Create(model);
        }

        public bool Update(HoaDonModel model)
        {
            return _res.Update(model);
        }

        public bool Delete(int MaHoaDon)
        {
            return _res.Delete(MaHoaDon);
        }

        public List<ThongkeHoaDonModel> Search(int pageIndex, int pageSize, out long total, string TenKH, DateTime? fr_NgayTao, DateTime? to_NgayTao, string TenSanPham)
        {
            return _res.Search(pageIndex, pageSize, out total, TenKH, fr_NgayTao, to_NgayTao,TenSanPham);
        }
    }
}
