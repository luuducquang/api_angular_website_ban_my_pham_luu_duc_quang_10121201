using BussinessLayer.Interfaces;
using DataAccessLayer;
using DataAccessLayer.Interfaces;
using Model;
using System;
using System.Collections.Generic;
using System.Diagnostics.SymbolStore;
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

        public List<ChiTietHoaDonModelTWO> Getbyids(int id)
        {
            return _res.Getbyids(id);
        }

        public List<HoaDonModel> Getbytaikhoan(int id)
        {
            return _res.Getbytaikhoan(id);
        }
        public List<HoaDonModel> GetbytaikhoanProduct(int id)
        {
            return _res.GetbytaikhoanProduct(id);
        }
        public bool Create(HoaDonModel model)
        {
            return _res.Create(model);
        }
        public bool Update(HoaDonModel model)
        {
            return _res.Update(model);
        }
    }
}
