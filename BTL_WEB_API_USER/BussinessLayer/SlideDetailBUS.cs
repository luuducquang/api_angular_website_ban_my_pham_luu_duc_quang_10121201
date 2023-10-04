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
    }
}
