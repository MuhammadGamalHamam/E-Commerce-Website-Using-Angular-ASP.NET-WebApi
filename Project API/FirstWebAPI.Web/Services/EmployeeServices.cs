using FirstWebAPI.Web.Data;
using FirstWebAPI.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstWebAPI.Web.Services
{
    public class EmployeeServices : ICompanyServices<EmployeeViewModel>
    {
        private readonly CompanyContext db;

        public EmployeeServices(CompanyContext db)
        {
            //this.db = new CompanyContext();
            this.db = db;
        }

        public void Add(EmployeeViewModel employee)
        {
            throw new NotImplementedException();
        }

        public void DeleteItem(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<EmployeeViewModel> GetAll()
        {
            return db.Employees.Select(e => new EmployeeViewModel
            {
                Id = e.Id,
                FirstName = e.FirstName,
                LastName = e.LastName,
                Gender = e.Gender,
                Salary = e.Salary
            }).ToList();
        }

        public EmployeeViewModel GetOne(int id)
        {
            return db.Employees.Select(e => new EmployeeViewModel
            {
                Id = e.Id,
                FirstName = e.FirstName,
                LastName = e.LastName,
                Gender = e.Gender,
                Salary = e.Salary
            }).FirstOrDefault(e => e.Id == id);
        }

        public void Update(int id, EmployeeViewModel item)
        {
            throw new NotImplementedException();
        }
    }
}