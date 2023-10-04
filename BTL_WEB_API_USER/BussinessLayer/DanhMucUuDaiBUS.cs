using BussinessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer
{
    public partial class DanhMucUuDaiBUS : IDanhMucUuDaiBUS
    {
        private IDanhMucUuDaiResponsitory _res;
        public DanhMucUuDaiBUS(IDanhMucUuDaiResponsitory res)
        {
            _res = res;
        }

        public List<DanhmucUuudaisModel> GetAllDanhmucUuudais()
        {
            return _res.GetAllDanhmucUuudais();
        }

        public List<DanhmucUuudaisModel> Search(int pageIndex, int pageSize, out long total, string Tendanhmucuudai)
        {
            return _res.Search(pageIndex, pageSize, out total, Tendanhmucuudai);
        }
    }
}
