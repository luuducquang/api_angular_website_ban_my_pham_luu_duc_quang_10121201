using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public partial interface IQuangCaoResponsitory
    {
        List<QuangCaoModel> GetDataAll();

        bool Create(QuangCaoModel model);
        bool Update(QuangCaoModel model);
        bool Delete(int id);

        List<QuangCaoModel> Search(int page, int pageSize, out long total, string AnhDaiDien, string LinkQuangCao, string MoTa);
    }
}
