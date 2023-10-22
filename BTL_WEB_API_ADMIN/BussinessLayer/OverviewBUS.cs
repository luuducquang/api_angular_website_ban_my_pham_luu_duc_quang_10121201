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
    public partial class OverviewBUS: IOverviewBUS
    {
        public IOverviewResponsitory _res;

        public OverviewBUS(IOverviewResponsitory tutorialResponsitory)
        {
            _res = tutorialResponsitory;
        }

        public OverViewModel Tongquan()
        {
            return _res.Tongquan();
        }
        public List<ThongketheonamModel> Thongkenam(int nam)
        {
            return _res.Thongkenam(nam);
        }
        public List<ThongketienchitheonamModel> Thongketienchinam(int nam)
        {
            return _res.Thongketienchinam(nam);
        }

        public List<ThongkedoanhthungayModel> Thongkedoanhthungay(int Nam,int Thang)
        {
            return _res.Thongkedoanhthungay(Nam,Thang);
        }

        public List<ThongketienchingayModel> Thongketienchingay(int Nam, int Thang)
        {
            return _res.Thongketienchingay(Nam, Thang);
        }
        public List<ThongkeHDBNamModel> Thongkehdbnam(int nam)
        {
            return _res.Thongkehdbnam(nam);
        }
        public List<ThongkeHDBNgayModel> Thongkehdbngay(int Nam, int Thang)
        {
            return _res.Thongkehdbngay(Nam, Thang);
        }

        public List<ThongkeHDNNamModel> Thongkehdnnam(int nam)
        {
            return _res.Thongkehdnnam(nam);
        }
        public List<ThongkeHDNNgayModel> Thongkehdnngay(int Nam, int Thang)
        {
            return _res.Thongkehdnngay(Nam, Thang);
        }
        public List<ThongkeKHNamModel> Thongkekhnam(int nam)
        {
            return _res.Thongkekhnam(nam);
        }
        public List<ThongkeKHNgayModel> Thongkekhngay(int Nam, int Thang)
        {
            return _res.Thongkekhngay(Nam, Thang);
        }
        public List<ThongkespbanchaytrongthangModel> Spbanchaythang()
        {
            return _res.Spbanchaythang();
        }
        public List<ThongkespbanchaytrongthangModel> Spsaphet()
        {
            return _res.Spsaphet();
        }
    }
}
