using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public partial interface ISanPhamResponsitory
    {
        bool Create(SanPhamModel model);

        bool Update(SanPhamModel model);

        public List<SanPhamDetailModel> Search(int pageIndex, int pageSize, out long total,string TenSanPham);
    }
}
