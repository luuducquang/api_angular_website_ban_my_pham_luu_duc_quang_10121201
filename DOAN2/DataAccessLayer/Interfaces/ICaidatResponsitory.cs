using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public partial interface ICaidatResponsitory
    {
        List<CaidatModel> GettAllCaidat();

        public bool Create(CaidatModel model);
        public bool Update(CaidatModel model);
        public bool Delete(int id);
    }
}
