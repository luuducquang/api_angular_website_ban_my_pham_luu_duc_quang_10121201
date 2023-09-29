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
    public partial class TaiKhoanBUS : ITaiKhoanBUS
    {
        public ITaiKhoanResponsitory _res;

        public TaiKhoanBUS(ITaiKhoanResponsitory taiKhoanResponsitory)
        {
            _res = taiKhoanResponsitory;
        }
        public bool Create(TaiKhoanModel model)
        {
            return _res.Create(model);
        }

        public bool Doimk(DoimkModel model)
        {
            return _res.Doimk(model);
        }

        public bool Delete(int MaTaiKhoan)
        {
            return _res.Delete(MaTaiKhoan);
        }

    }
}
