using Microsoft.AspNetCore.Mvc;
using QuanLyThietBi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLyThietBi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DonViController : ControllerBase
    {
        private ApplicationContext _context { get; set; }

        public DonViController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.DonVis.ToList());
            } catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/<DonVisController>
        [HttpGet("{id}", Name ="GetDonVi")]
        public ActionResult Get(Guid id)
        {
            try
            {
                var getDonVi = _context.DonVis.FirstOrDefault(g => g.DonViId == id);
                return Ok(getDonVi);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public ActionResult Post([FromBody] DonVi dv)
        {
            try
            {
                _context.DonVis.Add(dv);
                _context.SaveChanges();
                return CreatedAtRoute("GetDonVi", new { id = dv.DonViId }, dv);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public ActionResult Put(Guid id, [FromBody] DonVi dv)
        {
            try
            {
                if(dv.DonViId==id)
                {
                    _context.Entry(dv).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    _context.SaveChanges();
                    return CreatedAtRoute("GetDonVi", new { id = dv.DonViId }, dv);
                }
                else
                {
                    return BadRequest();
                }
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(Guid id)
        {
            try
            {
                var getDonVi = _context.DonVis.FirstOrDefault(g => g.DonViId == id);
                if(getDonVi!=null)
                {
                    _context.DonVis.Remove(getDonVi);
                    _context.SaveChanges();
                    return Ok(id);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}