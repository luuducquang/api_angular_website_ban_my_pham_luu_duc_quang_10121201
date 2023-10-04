using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public partial interface IDanhMucResponsitory
    {
        List<DanhMucModel> GetAllDanhmucs();
        List<DanhMucModel> Search(int pageIndex, int pageSize, out long total, string TenDanhMuc);


    }
}
