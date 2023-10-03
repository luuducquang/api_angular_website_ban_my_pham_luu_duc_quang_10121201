using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public partial interface IHangSanXuatResponsitory
    {
        List<HangSanXuatModel> GetHangSanXuats();

        public bool Create(HangSanXuatModel model);
        public bool Update(HangSanXuatModel model);
        public bool Delete(int mahsx);
        List<HangSanXuatModel> Search(int pageIndex, int pageSize, out long total, string TenHang);

    }
}
