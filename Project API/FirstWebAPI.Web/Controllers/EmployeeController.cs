using FirstWebAPI.Web.Models;
using FirstWebAPI.Web.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.WebPages;

namespace FirstWebAPI.Web.Controllers
{
    public class EmployeeController : ApiController
    {
        private readonly ICompanyServices<EmployeeViewModel> services;

        public EmployeeController(ICompanyServices<EmployeeViewModel> services)
        {
            this.services = services;
        }

        public IHttpActionResult Get()
        {
            var res = services.GetAll();
            return Ok(res);
        }
    }
}
