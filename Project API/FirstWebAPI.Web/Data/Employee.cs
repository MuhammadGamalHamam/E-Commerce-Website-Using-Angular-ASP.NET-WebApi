using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace FirstWebAPI.Web.Data
{
    [Table("Employee")]
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Gender Gender { get; set; }
        public double Salary { get; set; }
        public bool IsDeleted { get; set; }


        [ForeignKey("Department")]
        public int DeptId { get; set; }
        public virtual Department Department { get; set; }
    }

    public enum Gender
    {
        Male,
        Female
    }
}