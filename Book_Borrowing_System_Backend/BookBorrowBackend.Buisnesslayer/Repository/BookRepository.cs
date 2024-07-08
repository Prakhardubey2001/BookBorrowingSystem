using Book_Borrowing_System_Backend.Model;
using BookBorrowbackend.Domainlayer.IRepository;
using BookBorrowBackend.Buisnesslayer.DbContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookBorrowBackend.Buisnesslayer.Repository
{
    public class BookRepository:IBookRepository
    {
        private readonly BookBorrowBackendDbContext dbContext;
        public BookRepository(BookBorrowBackendDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        // create book in the database
        public async Task<Book> CreateBookAsync(Book book)
        {
            try
            {
                await dbContext.Books.AddAsync(book);
                await dbContext.SaveChangesAsync();
                return book;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                throw;
            }
        }
        // Delete book from database
        public async Task<Book> DeleteBookAsync(int id)
        {
            try
            {
                var book = await dbContext.Books.FirstOrDefaultAsync(x => x.Id == id);
                if (book == null)
                {
                    return null;
                }
                dbContext.Books.Remove(book);
                await dbContext.SaveChangesAsync();
                return book;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                throw;
            }
        }

        // Get all the book from the database
        public async Task<List<Book>> GetAllBookAsync(string filterOn = null, string filterQuery = null)
        {
            try
            {
                var books = dbContext.Books.AsQueryable();
                if (string.IsNullOrWhiteSpace(filterOn) == false && string.IsNullOrWhiteSpace(filterQuery) == false)
                {
                    books = books.Where(x => x.Is_Book_Available == true);
                    if (filterOn.Equals("Name", StringComparison.OrdinalIgnoreCase))
                    {
                        books = books.Where(x => x.Name.Contains(filterQuery));
                    }
                    if (filterOn.Equals("Author", StringComparison.OrdinalIgnoreCase))
                    {
                        books = books.Where(x => x.Author.Contains(filterQuery));
                    }
                    if (filterOn.Equals("Genre", StringComparison.OrdinalIgnoreCase))
                    {
                        books = books.Where(x => x.Genre.Contains(filterQuery));
                    }
                }
                return await books.ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                throw;
            }
        }
        // get the book on the basis of specific id from database
        public async Task<Book> GetBookByIdAsync(int id)
        {
            try
            {
                var book = await dbContext.Books.FirstOrDefaultAsync(x => x.Id == id);
                return book;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                throw;
            }
        }
        // update the book from database
        public async Task<Book> UpdateBookAsync(int id, Book book)
        {
            try
            {
                var bookDomainModel = await dbContext.Books.FirstOrDefaultAsync(x => x.Id == id);
                if (bookDomainModel == null)
                {
                    return null;
                }
                bookDomainModel.Name = book.Name;
                bookDomainModel.Description = book.Description;
                bookDomainModel.Author = book.Author;
                bookDomainModel.Rating = book.Rating;
                bookDomainModel.Genre = book.Genre;
                bookDomainModel.Is_Book_Available = book.Is_Book_Available;
                await dbContext.SaveChangesAsync();
                return bookDomainModel;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                throw;
            }
        }

        public async Task<Book> UpdateBookAvailableStatusAsync(int id, Book book, bool flag)
        {
            try
            {
                var bookModel = await dbContext.Books.FirstOrDefaultAsync(x => x.Id == id);
                if (bookModel == null)
                {
                    return null;
                }
                bookModel.Is_Book_Available = flag;
                await dbContext.SaveChangesAsync();
                return bookModel;
            }

            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                throw;
            }
        }
            public async Task<List<Book>> GetAllTheBorrowedBookAsync(string userId)
            {
                try
                {
                    var borrowedBooks = await dbContext.Books
                           .Where(b => b.CurrentlyBorrowedByUserId == userId)
                           .ToListAsync();
                    return borrowedBooks;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"An error occurred: {ex.Message}");
                    throw;

                }

            }
            public async Task<List<Book>> GetAllTheBooksCreatedAsync(string userId)
            {
                try
                {
                    var createdBooks = await dbContext.Books
                           .Where(b => b.LentByUserId == userId)
                           .ToListAsync();
                    return createdBooks;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"An error occurred: {ex.Message}");
                    throw;
                }
            }
        }

    }

