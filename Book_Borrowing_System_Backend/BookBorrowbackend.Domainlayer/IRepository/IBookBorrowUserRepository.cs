using Book_Borrowing_System_Backend.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookBorrowbackend.Domainlayer.IRepository
{   // this is the interface which is implemented by the Bookrepository in buisness layer
    public interface IBookBorrowUserRepository
    {
        Task<BookBorrowUser> GetUserDetailsByIdAsync(string userId);
        Task<bool> Update(string userId, BookBorrowUser updatedUser);
    }
}
