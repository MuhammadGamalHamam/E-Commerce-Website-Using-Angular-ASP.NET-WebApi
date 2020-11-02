using FirstWebAPI.Web.Data;
using FirstWebAPI.Web.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace FirstWebAPI.Web.Controllers
{
    public class AccountController : ApiController
    {
        public async Task<IHttpActionResult> PostUser(UserModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CompanyContext context = new CompanyContext();
            UserStore<IdentityUser> store = new UserStore<IdentityUser>(context);
            UserManager<IdentityUser> manager = new UserManager<IdentityUser>(store);

            IdentityUser user = new IdentityUser
            {
                UserName = userModel.Name
            };

            var identityResult = await manager.CreateAsync(user, userModel.Password);
            if (identityResult.Succeeded)
            {
                return Created("", "User Added Successfully");
            }

            return BadRequest(IdentityResultErrors(identityResult.Errors.ToList()));
        }

        // [NonAction]
        private string IdentityResultErrors(List<string> errors)
        {
            StringBuilder builder = new StringBuilder();

            foreach (var item in errors)
            {
                builder.AppendLine(item);
            }

            return builder.ToString();
        }
    }
}
