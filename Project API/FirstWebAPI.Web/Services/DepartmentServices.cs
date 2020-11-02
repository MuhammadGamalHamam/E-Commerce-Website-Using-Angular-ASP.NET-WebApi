using FirstWebAPI.Web.Data;
using FirstWebAPI.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstWebAPI.Web.Services
{
    public class DepartmentServices : ICompanyServices<DepartmentViewModel>
    {
        private readonly CompanyContext db;

        public DepartmentServices(CompanyContext db)
        {
            this.db = db;
        }

        public void Add(DepartmentViewModel department)
        {
            throw new NotImplementedException();
        }

        public void DeleteItem(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<DepartmentViewModel> GetAll()
        {
            return db.Departments.Select(d => new DepartmentViewModel
            {
                Id = d.Id,
                Name = d.Name
            }).ToList();
        }

        public DepartmentViewModel GetOne(int id)
        {
            return db.Departments.Select(d => new DepartmentViewModel
            {
                Id = d.Id,
                Name = d.Name
            }).FirstOrDefault(d => d.Id == id);
        }

        public void Update(int id, DepartmentViewModel item)
        {
            throw new NotImplementedException();
        }
    }
}