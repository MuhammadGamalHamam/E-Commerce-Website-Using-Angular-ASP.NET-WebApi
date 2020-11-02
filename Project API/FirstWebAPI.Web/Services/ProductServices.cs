using FirstWebAPI.Web.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstWebAPI.Web.Services
{
    public class ProductServices : ICompanyServices<Product>
    {
        private readonly CompanyContext db;

        public ProductServices(CompanyContext db)
        {
            this.db = db;
        }

        public void Add(Product product)
        {
            db.Products.Add(product);
            db.SaveChanges();
        }

        public void DeleteItem(int id)
        {
            var prd = GetOne(id);
            db.Products.Remove(prd);
            db.SaveChanges();
        }

        public IEnumerable<Product> GetAll()
        {
            return db.Products.ToList();
        }

        public Product GetOne(int id)
        {
            var prod = db.Products.FirstOrDefault(p => p.Id == id);
            return prod;
        }

        public void Update(int id, Product item)
        {
            var prd = GetOne(id);
            prd.Name = item.Name;
            prd.Price = item.Price;
            prd.Quantity = item.Quantity;
            db.SaveChanges();
        }
    }
}