using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FirstWebAPI.Web.Services
{
    public interface ICompanyServices<T>
    {
        IEnumerable<T> GetAll();
        T GetOne(int id);
        void Add(T item);
        void Update(int id, T item);
        void DeleteItem(int id);
    }
}
