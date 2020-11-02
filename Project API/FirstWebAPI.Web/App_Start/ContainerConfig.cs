using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using FirstWebAPI.Web.Data;
using FirstWebAPI.Web.Models;
using FirstWebAPI.Web.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Http;
using System.Web.Mvc;

namespace FirstWebAPI.Web
{
    public class ContainerConfig
    {
        internal static void RegisterContainer(HttpConfiguration httpConfiguration)
        {
            var builder = new ContainerBuilder();

            builder.RegisterApiControllers(typeof(WebApiApplication).Assembly);

            builder.RegisterType<EmployeeServices>()
                .As<ICompanyServices<EmployeeViewModel>>()
                .InstancePerRequest();

            builder.RegisterType<DepartmentServices>()
                .As<ICompanyServices<DepartmentViewModel>>()
                .InstancePerRequest();

            builder.RegisterType<ProductServices>()
                .As<ICompanyServices<Product>>()
                .InstancePerRequest();

            builder.RegisterType<CompanyContext>()
                .InstancePerRequest();

            var container = builder.Build();
            httpConfiguration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}