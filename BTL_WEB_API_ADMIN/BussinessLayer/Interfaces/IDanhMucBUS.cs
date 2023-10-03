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

        public bool Create(DanhMucModel model);
        public bool Update(DanhMucModel model);
        public bool Delete(int madanhmuc);
        List<DanhMucModel> Search(int pageIndex, int pageSize, out long total, string TenDanhMuc);



    }
}
