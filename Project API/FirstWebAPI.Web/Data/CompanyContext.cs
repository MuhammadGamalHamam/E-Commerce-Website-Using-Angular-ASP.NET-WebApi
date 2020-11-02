using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace FirstWebAPI.Web.Data
{
    public class CompanyContext : IdentityDbContext
    {
        public CompanyContext() : base("CompanyCS")
        {

        }

        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<Department> Departments { get; set; }
        public virtual DbSet<Product> Products { get; set; }
    }
}