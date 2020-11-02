using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace FirstWebAPI.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // To enable CORS globally use
            // This needs to "Install-Package Microsoft.AspNet.WebApi.Cors"

            //var cors = new EnableCorsAttribute("www.example.com", "*", "*");
            //config.EnableCors(cors);

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
