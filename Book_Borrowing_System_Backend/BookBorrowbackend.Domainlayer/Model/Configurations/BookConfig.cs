using Book_Borrowing_System_Backend.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace BookBorrowbackend.Domainlayer.Model.Configurations
{
    public class BookConfig : IEntityTypeConfiguration<Book>
    {   // writing the configuration of on model creating in the Dbcontext
        public void Configure(EntityTypeBuilder<Book> builder)
        {
            builder
               .HasOne(b => b.LentByUser)
               .WithMany()
               .HasForeignKey(b => b.LentByUserId);
        }
    }

}
