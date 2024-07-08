using Book_Borrowing_System_Backend.Model;
using BookBorrowbackend.Domainlayer.DTO;
using BookBorrowbackend.Domainlayer.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Book_Borrowing_System_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IssueAgreementController : ControllerBase
    {
        private readonly UserManager<BookBorrowUser> bookborrowuser;
        private readonly IBookRepository bookRepository;
        private readonly IBookBorrowUserRepository bookBorrowUserRepository;
        public IssueAgreementController(UserManager<BookBorrowUser> bookborrowuser, IBookRepository bookRepository, IBookBorrowUserRepository bookBorrowUserRepository)
        {
            this.bookborrowuser = bookborrowuser;
            this.bookRepository = bookRepository;
            this.bookBorrowUserRepository = bookBorrowUserRepository;
        }
        [HttpGet("issuebook/{bookId:int}")]
        [Authorize]
        public async Task<IActionResult> BorrowBook([FromRoute] int bookId)
        {
            
            try
            {
                var user = await bookborrowuser.GetUserAsync(HttpContext.User);
                if (User.Identity.IsAuthenticated == false)
                {
                    return Unauthorized("The User is not exist!!.Please register");
                }
                var book = await bookRepository.GetBookByIdAsync(bookId);
                if (book == null)
                {
                    return NotFound("Book not found.");
                }
                if (user.Id == book.LentByUserId)
                {
                    return BadRequest($"Book not borrow to the user with Id:- {user.Id}. The user which lent the book try to borrow the same book.");
                }
                if (book.Is_Book_Available == false || user.TokensAvailable == 0)
                {
                    return BadRequest("Book is not available to borrow.");
                }
                book.CurrentlyBorrowedByUserId = user.Id;
                await bookRepository.UpdateBookAvailableStatusAsync(book.Id, book, false);
                user.TokensAvailable--;
                await bookBorrowUserRepository.Update(user.Id, user);
                var userModel = await bookBorrowUserRepository.GetUserDetailsByIdAsync(book.LentByUserId);
                if (userModel == null)
                {
                    return NotFound($"The user does not exists :- {userModel.Id}");
                }
                userModel.TokensAvailable++;
                await bookBorrowUserRepository.Update(userModel.Id, userModel);
                var issueDTO = new IssueDTO
                {
                    Id = book.Id,
                    Name = book.Name,
                    Rating = book.Rating,
                    Author = book.Author,
                    Genre = book.Genre,
                    Description = book.Description,
                    Is_Book_Available = book.Is_Book_Available,
                    LentByUserId = book.LentByUserId,
                    CurrentlyBorrowedByUserId = user.Id,
                    FullName = user.Name,
                    TokensAvailable = user.TokensAvailable
                };
                return Ok(issueDTO);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while borrowing a book: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }

        }

        [HttpGet("ToGetAllTheBorrowedBooksBythatUser")]
        public async Task<IActionResult> GetAllBorrowBookByUser()
        {
           
            try
            {
                var user = await bookborrowuser.GetUserAsync(HttpContext.User);

                if (User.Identity.IsAuthenticated == false || user.Id == null)
                {
                    return Unauthorized("The User is not exist!!. Please register");
                }

                var borrowBooks = await bookRepository.GetAllTheBorrowedBookAsync(user.Id);
                return Ok(borrowBooks);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while performing the task");
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }

        }

        [HttpGet("ToGetAlltheBooksCreatedBythatUser")]
        public async Task<IActionResult> GetAllBooksCreatedByUser()
        {
            
            try
            {
                var user = await bookborrowuser.GetUserAsync(HttpContext.User);

                if (User.Identity.IsAuthenticated == false || user.Id == null)
                {
                    return Unauthorized("The User is not exist!!. Please register");
                }

                var createdBooks = await bookRepository.GetAllTheBooksCreatedAsync(user.Id);
                return Ok(createdBooks);
            }
            catch (Exception ex)
            {
                
                Console.WriteLine($"Some error occurred while getting all the books");
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }

        }
        [HttpGet("ReturnBook/{bookId:int}")]
        [Authorize]
        public async Task<IActionResult> ReturnBook([FromRoute] int bookId)
        {
            try
            {
                var user = await bookborrowuser.GetUserAsync(HttpContext.User);
                if (User.Identity.IsAuthenticated == false)
                {
                    return Unauthorized("The User is not exist!!.Please register");
                }
                var book = await bookRepository.GetBookByIdAsync(bookId);
                if (book == null)
                {
                    return NotFound("Book not found.");
                }
                if (book.Is_Book_Available == true)
                {
                    return BadRequest($"The book with Book Id:- {book.Id} is already returned.");
                }
                book.CurrentlyBorrowedByUserId = null;
                await bookRepository.UpdateBookAvailableStatusAsync(book.Id, book, true);
                return Ok($"The book with Book Id: -{book.Id} and Name :- {book.Name} is returned successfully by the user :- {user.Name}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Some error occurred while returning a book please retry");
                return StatusCode(500, $"Internal Server Error: {ex.Message}"); 
            }
        }

    }
}
