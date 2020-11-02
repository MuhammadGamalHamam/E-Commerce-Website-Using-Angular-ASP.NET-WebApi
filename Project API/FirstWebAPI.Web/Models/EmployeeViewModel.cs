using FirstWebAPI.Web.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstWebAPI.Web.Models
{
    public class EmployeeViewModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Gender Gender { get; set; }
        public double Salary { get; set; }
    }
}