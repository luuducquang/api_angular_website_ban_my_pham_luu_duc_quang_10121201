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
    public partial class CaiDatBUS :ICaidatBUS
    {
        private ICaidatResponsitory _res;

        public CaiDatBUS(ICaidatResponsitory caidatResponsitory)
        {
            _res = caidatResponsitory;
        }

        public List<CaidatModel> GetAllCaidat()
        {
            return _res.GettAllCaidat();
        }

        public bool Create(CaidatModel model)
        {
            return _res.Create(model);
        }

        public bool Update(CaidatModel model)
        {
            return _res.Update(model);
        }

        public bool Delete(int id)
        {
            return _res.Delete(id);
        }
    }
}
