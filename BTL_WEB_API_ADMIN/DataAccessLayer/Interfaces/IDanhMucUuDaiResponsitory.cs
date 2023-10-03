using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public partial interface IDanhMucUuDaiResponsitory
    {
        List<DanhmucUuudaisModel> GetAllDanhmucUuudais();

        public bool Create(DanhmucUuudaisModel model);
        public bool Update(DanhmucUuudaisModel model);
        public bool Delete(int madanhmucuudai);
        List<DanhmucUuudaisModel> Search(int pageIndex, int pageSize, out long total, string Tendanhmucuudai);

    }
}
