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
    public partial class SlideDetailBUS : ISlideDetailBUS
    {
        private ISlideDetailResponsitory _res;
        public SlideDetailBUS(ISlideDetailResponsitory res)
        {
            _res = res;
        }

        public List<SlideDetailModel> GetAllSlide()
        {
            return _res.GetAllSlide();
        }

        public bool Create(SlideDetailModel model)
        {
            return _res.Create(model);
        }

        public bool Update(SlideDetailModel model)
        {
            return _res.Update(model);
        }

        public bool Delete(int MaAnh)
        {
            return _res.Delete(MaAnh);
        }

        public List<SlideDetailModel> Search(int pageIndex, int pageSize, out long total, string TieuDe)
        {
            return _res.Search(pageIndex, pageSize, out total, TieuDe);
        }
    }
}
