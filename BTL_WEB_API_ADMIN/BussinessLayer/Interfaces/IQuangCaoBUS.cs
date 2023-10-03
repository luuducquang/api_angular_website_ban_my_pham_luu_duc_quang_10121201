using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer.Interfaces
{
    public partial interface IQuangCaoBUS
    {
        List<QuangCaoModel> GetDataAll();

        bool Create(QuangCaoModel quangCao);
        bool Update(QuangCaoModel quangCao);
        bool Delete(int id);

        List<QuangCaoModel> Search(int page, int pageSize, out long total, string MoTa);

    }
}
