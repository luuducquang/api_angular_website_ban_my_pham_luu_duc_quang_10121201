using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer.Interfaces
{
    public partial interface ICaidatBUS
    {
        List<CaidatModel> GetAllCaidat();

        public bool Create(CaidatModel model);
        public bool Update(CaidatModel model);
        public bool Delete(int id);

    }
}
