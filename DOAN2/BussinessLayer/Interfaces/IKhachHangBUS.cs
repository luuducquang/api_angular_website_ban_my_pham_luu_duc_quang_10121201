using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer.Interfaces
{
    public partial interface IKhachHangBUS
    {
        bool Create(KhachHangModel model);
        bool Update(KhachHangModel model);

        List<KhachHangModel> GetDataAll();
        bool Delete(int id);

        List<KhachHangModel> Search(int pageIndex, int pageSize, out long total, string tenkh, string diachi);

    }
}
