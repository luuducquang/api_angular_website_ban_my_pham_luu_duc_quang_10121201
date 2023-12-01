using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public partial interface ITinTucResponsitory
    {
        TinTucsModel Getbyid(int id);

        bool Create(TinTucsModel model);
        bool Update(TinTucsModel model);
        bool Delete(int id);

        List<TinTucsModel> Search(int page, int pageSize, out long total, string TieuDe,string TrangThai);
    }
}
