using Book_Borrowing_System_Backend.Model;
using BookBorrowbackend.Domainlayer.IRepository;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookBorrowBackend.Buisnesslayer.Repository
{
    public class BookBorrowUserRepository:IBookBorrowUserRepository
    {
        
        private readonly UserManager<BookBorrowUser> bookborrowuser;
        // Constructor to initialize the repository with the UserManager
        public BookBorrowUserRepository(UserManager<BookBorrowUser> bookborrowuser)
        {
            this.bookborrowuser = bookborrowuser;
        }
        // get the details of the user based on id from database
        public async Task<BookBorrowUser> GetUserDetailsByIdAsync(string userId)
        {
            var user = await bookborrowuser.FindByIdAsync(userId);
            if (user == null)
            {
                return null;
            }
            return user;
        }
        // Update the detals of Asp.net.users Token available
        public async Task<bool> Update(string userId, BookBorrowUser updatedUser)
        {
            var user = await bookborrowuser.FindByIdAsync(userId);
            if (user == null)
            {
                return false;
            }
            // Update the TokensAvailable property
            user.TokensAvailable = updatedUser.TokensAvailable;
            var result = await bookborrowuser.UpdateAsync(user);
            return result.Succeeded;
        }
    }
}
