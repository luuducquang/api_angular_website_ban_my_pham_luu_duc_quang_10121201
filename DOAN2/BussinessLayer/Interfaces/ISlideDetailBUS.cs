using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer.Interfaces
{
    public partial interface ISlideDetailBUS
    {
        List<SlideDetailModel> GetAllSlide();

        bool Create(SlideDetailModel model);
        bool Update(SlideDetailModel model);
        bool Delete(int MaAnh);

    }
}
