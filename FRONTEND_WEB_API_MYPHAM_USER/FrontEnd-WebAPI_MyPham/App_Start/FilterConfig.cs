using System.Web;
using System.Web.Mvc;

namespace FrontEnd_WebAPI_MyPham
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
