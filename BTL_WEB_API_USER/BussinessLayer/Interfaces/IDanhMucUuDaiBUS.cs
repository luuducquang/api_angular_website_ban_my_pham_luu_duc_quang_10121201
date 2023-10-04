using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer.Interfaces
{
    public partial interface IDanhMucUuDaiBUS
    {
        List<DanhmucUuudaisModel> GetAllDanhmucUuudais();
        List<DanhmucUuudaisModel> Search(int pageIndex, int pageSize, out long total, string Tendanhmucuudai);



    }
}
