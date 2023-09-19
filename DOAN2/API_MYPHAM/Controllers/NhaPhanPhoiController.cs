using BussinessLayer;
using BussinessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_MYPHAM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NhaPhanPhoiController : ControllerBase
    {
        private INhaPhanPhoiBUS _nhaPhanPhoiBUS;

        public NhaPhanPhoiController(INhaPhanPhoiBUS nhaPhanPhoiBUS)
        {
            _nhaPhanPhoiBUS = nhaPhanPhoiBUS;
        }

        [Route("get-all-nhaphanphoi")]
        [HttpGet]
        public IEnumerable<NhaPhanPhoiModel> GetDataAll()
        {
            return _nhaPhanPhoiBUS.GetNhaPhanPhois();
        }

        [Route("create-nhaphanphoi")]
        [HttpPost]
        public bool Create(NhaPhanPhoiModel model)
        {
            return _nhaPhanPhoiBUS.Create(model);
        }

        [Route("update-nhaphanphoi")]
        [HttpPut]
        public bool Update(NhaPhanPhoiModel model)
        {
            return _nhaPhanPhoiBUS.Update(model);
        }

        [Route("delete-nhaphanphoi")]
        [HttpDelete]
        public bool Delete(int manhaphanphoi)
        {
            return _nhaPhanPhoiBUS.Delete(manhaphanphoi);
        }

    }
}
