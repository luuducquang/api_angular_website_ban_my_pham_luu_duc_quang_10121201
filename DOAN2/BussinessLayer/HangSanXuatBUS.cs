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
    public partial class HangSanXuatBUS : IHangSanXuatBUS
    {
        private IHangSanXuatResponsitory _res;
        public HangSanXuatBUS(IHangSanXuatResponsitory res)
        {
            _res = res;
        }

        public List<HangSanXuatModel> GetHangSanXuats()
        {
            return _res.GetHangSanXuats();
        }

        public bool Create(HangSanXuatModel model)
        {
            return _res.Create(model);
        }

        public bool Update(HangSanXuatModel model)
        {
            return _res.Update(model);
        }

        public bool Delete(int mahsx)
        {
            return _res.Delete(mahsx);
        }

        public List<HangSanXuatModel> Search(int pageIndex, int pageSize, out long total, string TenHang)
        {
            return _res.Search(pageIndex, pageSize, out total, TenHang);
        }
    }
}
