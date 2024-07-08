using Book_Borrowing_System_Backend.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookBorrowbackend.Domainlayer.IRepository
{// this is the interface which is implemented by the BookRepository in buisness layer
    public interface IBookRepository
    {
        Task<List<Book>> GetAllBookAsync(string filterOn = null, string filterQuery = null);
        Task<Book> GetBookByIdAsync(int id);
        Task<Book> CreateBookAsync(Book book);
        Task<Book> UpdateBookAsync(int id, Book book);
        Task<Book> DeleteBookAsync(int id);
        Task<Book> UpdateBookAvailableStatusAsync(int id, Book book, bool flag);
        Task<List<Book>> GetAllTheBorrowedBookAsync(string userId);
        Task<List<Book>> GetAllTheBooksCreatedAsync(string userId);
    }
}
