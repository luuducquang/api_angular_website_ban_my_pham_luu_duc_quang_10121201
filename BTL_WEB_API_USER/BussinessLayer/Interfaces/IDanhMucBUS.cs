using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer.Interfaces
{
    public partial interface IDanhMucBUS
    {
        List<DanhMucModel> GetAllDanhmucs();
        List<DanhMucModel> Search(int pageIndex, int pageSize, out long total, string TenDanhMuc);
    }
}
