

using Microsoft.EntityFrameworkCore;


namespace QuanLyThietBi.Models
{
    public class ApplicationContext : DbContext
    {
        public virtual DbSet<DonVi> DonVis { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        { }
    }
}