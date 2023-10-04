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

    }
}
