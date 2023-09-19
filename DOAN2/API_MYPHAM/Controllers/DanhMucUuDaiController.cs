using BussinessLayer;
using BussinessLayer.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_MYPHAM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhMucUuDaiController : ControllerBase
    {
        private IDanhMucUuDaiBUS _danhMucUuDaiBUS;

        public DanhMucUuDaiController(IDanhMucUuDaiBUS danhMucUuDai)
        {
            _danhMucUuDaiBUS = danhMucUuDai;
        }

        [Route("get-all-danhmucuudai")]
        [HttpGet]
        public IEnumerable<DanhmucUuudaisModel> GetDataAll()
        {
            return _danhMucUuDaiBUS.GetAllDanhmucUuudais();
        }

        [Route("create-danhmucuudai")]
        [HttpPost]
        public bool Create(DanhmucUuudaisModel model)
        {
            return _danhMucUuDaiBUS.Create(model);
        }

        [Route("update-danhmucuudai")]
        [HttpPut]
        public bool Update(DanhmucUuudaisModel model)
        {
            return _danhMucUuDaiBUS.Update(model);
        }

        [Route("delete-danhmucuudai")]
        [HttpDelete]
        public bool Delete(int madanhmucuudai)
        {
            return _danhMucUuDaiBUS.Delete(madanhmucuudai);
        }
    }
}
