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
    public partial class QuangCaoBUS : IQuangCaoBUS
    {
        private IQuangCaoResponsitory _res;
        public QuangCaoBUS(IQuangCaoResponsitory res)
        {
            _res = res;
        }

        public List<QuangCaoModel> GetDataAll()
        {
            return _res.GetDataAll();
        }

        public bool Create(QuangCaoModel model)
        {
            return _res.Create(model);
        }

        public bool Update(QuangCaoModel model)
        {
            return _res.Update(model);
        }

        public bool Delete(int id)
        {
            return _res.Delete(id);
        }

        public List<QuangCaoModel> Search(int page, int pageSize, out long total, string MoTa)
        {
            return _res.Search(page,pageSize,out total,MoTa);
        }
    }
}
