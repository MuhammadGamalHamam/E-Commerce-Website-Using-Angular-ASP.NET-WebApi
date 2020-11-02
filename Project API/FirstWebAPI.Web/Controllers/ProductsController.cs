using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using FirstWebAPI.Web.Data;
using FirstWebAPI.Web.Services;

namespace FirstWebAPI.Web.Controllers
{
    // [Authorize]
    public class ProductsController : ApiController
    {
        private readonly ICompanyServices<Product> db;

        public ProductsController(ICompanyServices<Product> db)
        {
            this.db = db;
        }

        // GET: api/Products
        public IEnumerable<Product> GetProducts()
        {
            return db.GetAll();
        }

        // GET: api/Products/5
        [ResponseType(typeof(Product))]
        public IHttpActionResult GetProduct(int id)
        {
            Product product = db.GetOne(id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        
        // PUT: api/Products/5
        [Authorize]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProduct(int id, Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != product.Id)
            {
                return BadRequest();
            }

            db.Update(id, product);

            // return StatusCode(HttpStatusCode.NoContent);
            return Ok("Updated Successfully!");
        }
        

        // POST: api/Products
        [Authorize]
        [ResponseType(typeof(Product))]
        public IHttpActionResult PostProduct(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Add(product);

            return Ok("Added Successfully!");
            //return CreatedAtRoute("DefaultApi", new { id = product.Id }, product);
        }

        
        // DELETE: api/Products/5
        [Authorize]
        [ResponseType(typeof(Product))]
        public IHttpActionResult DeleteProduct(int id)
        {
            db.DeleteItem(id);

            return Ok("Deleted Successfully!");
        }

        /*
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductExists(int id)
        {
            return db.Products.Count(e => e.Id == id) > 0;
        }
        */
    }
}