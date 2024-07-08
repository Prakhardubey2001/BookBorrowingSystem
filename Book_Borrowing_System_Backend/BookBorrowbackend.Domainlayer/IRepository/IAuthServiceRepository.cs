using Book_Borrowing_System_Backend.Model;
using BookBorrowbackend.Domainlayer.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookBorrowbackend.Domainlayer.IRepository
{
    // this is the interface which is implemented by the AuthserviceRepository in buisness layer
    public interface IAuthServiceRepository
    {
        Task<BookBorrowUser> Login(RequestForLoginDTO RequestforloginDTO);
        Task<bool> RegisterUser(RequestForRegisterDTO RequestforRegisterDTO);
        string GenerateTokenString(RequestForLoginDTO RequestforloginDTO, BookBorrowUser user);
    }
}
