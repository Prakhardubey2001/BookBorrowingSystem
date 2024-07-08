using Book_Borrowing_System_Backend.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace BookBorrowBackend.Buisnesslayer.DbContext
{
    public class BookBorrowBackendDbContext: IdentityDbContext<BookBorrowUser>
    {
        public BookBorrowBackendDbContext(DbContextOptions dbContextOptions):base(dbContextOptions) { 

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // The details are filled in the configurations folder in model folder in domain layer
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
        public DbSet<Book> Books { get; set; }


    }
}
