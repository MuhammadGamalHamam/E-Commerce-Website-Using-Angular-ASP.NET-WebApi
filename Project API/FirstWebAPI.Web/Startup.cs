using System;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using FirstWebAPI.Web.Data;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.OAuth;
using Owin;

[assembly: OwinStartup(typeof(FirstWebAPI.Web.Startup))]

namespace FirstWebAPI.Web
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=316888
            app.UseCors(CorsOptions.AllowAll);

            app.UseOAuthAuthorizationServer(new OAuthAuthorizationServerOptions
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(5),
                Provider = new OAuthTokenCreate()
            });

            // Check user token
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());

            // Create default Admin
            CreateRolesandUsers();

            // The last thing we should do here in "Startup.cs" because of the Authentication.
            // Configurations where located in "WebApiConfig.cs"

            // Configure Routing
            //HttpConfiguration config = new HttpConfiguration();

            //config.MapHttpAttributeRoutes();
            //config.Routes.MapHttpRoute(
            //    name: "Default",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);

            // For hosting on IIS
            //app.UseWebApi(config);


        }

        private void CreateRolesandUsers()
        {
            CompanyContext context = new CompanyContext();

            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
            var UserManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(context));


            // In Startup iam creating first Admin Role and creating a default Admin User     
            if (!roleManager.RoleExists("Admin"))
            {
                // first we create Admin rool
                var role = new IdentityRole
                {
                    Name = "Admin"
                };
                roleManager.Create(role);

                //Here we create a Admin super user who will maintain the website

                var user = new IdentityUser
                {
                    UserName = "admin",
                    Email = "adminWebSite@gmail.com"
                };

                string userPWD = "12345678";

                var chkUser = UserManager.Create(user, userPWD);

                //Add default User to Role Admin
                if (chkUser.Succeeded)
                {
                    var result = UserManager.AddToRole(user.Id, "Admin");
                }
                else
                {
                    foreach (var item in chkUser.Errors)
                    {
                        Console.WriteLine(item);
                    }
                }
            }

            // Creating Manager role     
            if (!roleManager.RoleExists("User"))
            {
                var role = new IdentityRole
                {
                    Name = "User"
                };
                roleManager.Create(role);
            }
        }
    }

    internal class OAuthTokenCreate : OAuthAuthorizationServerProvider
    {
        // For Validating any client without ClientId
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        // Url: "/token"
        // Method: POST
        // Obj sent: { Username: "", Password: "", grant_type: "password" }
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            // Cors
            context.OwinContext.Response.Headers.Add("Access - Control - Allow - Origin", new[] { "*" });

            // Check if this user already exists
            CompanyContext dbContext = new CompanyContext();
            UserStore<IdentityUser> store = new UserStore<IdentityUser>(dbContext);
            UserManager<IdentityUser> manager = new UserManager<IdentityUser>(store);

            var user = manager.Find(context.UserName, context.Password);
            if(user == null)
            {
                context.SetError("grant_error", "Username and Password not found");
                return;
            }

            ClaimsIdentity claims = new ClaimsIdentity(context.Options.AuthenticationType);
            claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, context.UserName));
            //claims.AddClaim(new Claim("Age", "25"));
            //claims.AddClaim(new Claim(ClaimTypes.Role, "admin"));

            context.Validated(claims);

            
            // return base.GrantResourceOwnerCredentials(context);
        }
    }
}
