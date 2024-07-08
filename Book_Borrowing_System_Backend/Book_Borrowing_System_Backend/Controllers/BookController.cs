using Book_Borrowing_System_Backend.Model;
using BookBorrowbackend.Domainlayer.DTO;
using BookBorrowbackend.Domainlayer.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Book_Borrowing_System_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController:ControllerBase
    {
        private readonly UserManager<BookBorrowUser> bookborrowuser;
        private readonly IBookRepository bookRepository;
        public BookController(UserManager<BookBorrowUser>bookborrowuser,IBookRepository bookRepository)
        {
            this.bookborrowuser = bookborrowuser;
            this.bookRepository = bookRepository;
        }
        [HttpPost("ToCreateBook")]
        [Authorize]
        public async Task<IActionResult> CreateBook([FromBody] BookAddDTO BookaddDTO)
        {
         
            try
            {
                var user = await bookborrowuser.GetUserAsync(HttpContext.User);

                if (User.Identity.IsAuthenticated)
                {
                    string userName = User.Identity.Name;
                    string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                    string userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

                    if (userId == null)
                    {
                        return Unauthorized("The User is not exist!!. Please register");
                    }
                }

                var bookDomainModel = new Book
                {
                    Name = BookaddDTO.Name,
                    Rating = BookaddDTO.Rating,
                    Author = BookaddDTO.Author,
                    Genre = BookaddDTO.Genre,
                    Description = BookaddDTO.Description,
                    LentByUserId = user.Id
                };

                await bookRepository.CreateBookAsync(bookDomainModel);

                var bookDTO = new BookDTO
                {
                    Id = bookDomainModel.Id,
                    Name = bookDomainModel.Name,
                    Rating = bookDomainModel.Rating,
                    Author = bookDomainModel.Author,
                    Genre = bookDomainModel.Genre,
                    Description = bookDomainModel.Description,
                    LentByUserId = bookDomainModel.LentByUserId
                };

                return CreatedAtAction(nameof(GetBookByTheId), new { Id = bookDTO.Id }, bookDTO);
            }
            catch (Exception ex)
            {
               
                Console.WriteLine($"An error occurred while creating the book");
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }

        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetBookByTheId([FromRoute] int id)
        {
            
            try
            {
                var bookDomainModel = await bookRepository.GetBookByIdAsync(id);

                if (bookDomainModel == null)
                {
                    return NotFound($"The Given Book does not exist with id :- {id}");
                }

                var bookDTO = new BookDTO
                {
                    Id = bookDomainModel.Id,
                    Name = bookDomainModel.Name,
                    Rating = bookDomainModel.Rating,
                    Author = bookDomainModel.Author,
                    Genre = bookDomainModel.Genre,
                    Description = bookDomainModel.Description,
                    LentByUserId = bookDomainModel.LentByUserId,
                    CurrentlyBorrowedByUserId = bookDomainModel.CurrentlyBorrowedByUserId
                };

                return Ok(bookDTO);
            }
            catch (Exception ex)
            {
                
                Console.WriteLine("Some error occured in getting the specific book");
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }

        }
        [HttpGet("ToGetAlltheBooks")]
        public async Task<IActionResult> GetAllTheBooks([FromQuery] string filterOn, [FromQuery] string filterQuery)
        {
            
            try
            {
                var books = await bookRepository.GetAllBookAsync(filterOn, filterQuery);

                var bookDTO = new List<BookDTO>();
                foreach (var book in books)
                {
                    bookDTO.Add(new BookDTO
                    {
                        Id = book.Id,
                        Name = book.Name,
                        Rating = book.Rating,
                        Author = book.Author,
                        Genre = book.Genre,
                        Description = book.Description,
                        LentByUserId = book.LentByUserId,
                        Is_Book_Available = book.Is_Book_Available,
                        CurrentlyBorrowedByUserId = book.CurrentlyBorrowedByUserId
                    });
                }

                return Ok(bookDTO);
            }
            catch (Exception ex)
            {
                
                Console.WriteLine("An error Occured in Getting all the books");
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }

        }

        [HttpPut("Updatebook/{id:int}")]
        [Authorize]
        public async Task<IActionResult> UpdateTheBook([FromRoute] int id, [FromBody] BookEditDTO BookeditDTO)
        {
           
            try
            {
                var bookModel = await bookRepository.GetBookByIdAsync(id);

                if (bookModel != null && bookModel.Is_Book_Available == false)
                {
                    return NotFound($"Book with Id:-{bookModel.Id} its Name :- {bookModel.Name} and author :- {bookModel.Author} cannot be updated because it is already borrowed by some user. Try some other book.");
                }

                var bookDomainModel = new Book
                {
                    Name = BookeditDTO.Name,
                    Rating = BookeditDTO.Rating,
                    Author = BookeditDTO.Author,
                    Genre = BookeditDTO.Genre,
                    Description = BookeditDTO.Description,
                    Is_Book_Available = BookeditDTO.Is_Book_Available
                };

                bookDomainModel = await bookRepository.UpdateBookAsync(id, bookDomainModel);

                if (bookDomainModel == null)
                {
                    return NotFound("The Book you are looking for does not exist");
                }

                var bookDTO = new BookDTO
                {
                    Id = bookDomainModel.Id,
                    Name = bookDomainModel.Name,
                    Rating = bookDomainModel.Rating,
                    Author = bookDomainModel.Author,
                    Genre = bookDomainModel.Genre,
                    Description = bookDomainModel.Description,
                    LentByUserId = bookDomainModel.LentByUserId,
                    CurrentlyBorrowedByUserId = bookDomainModel.CurrentlyBorrowedByUserId
                };

                return Ok(bookDTO);
            }
            catch (Exception ex)
            {
                
                Console.WriteLine("Some error occured while updating the book");
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }


        }
        [HttpDelete("DeleteBook/{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteTheBook([FromRoute] int id)
        {
            
            try
            {
                var bookModel = await bookRepository.GetBookByIdAsync(id);

                if (bookModel != null && bookModel.Is_Book_Available == false)
                {
                    return NotFound($"The Book with Id :-{bookModel.Id} Name :- {bookModel.Name} and its author :- {bookModel.Author} cannot be deleted because it is already borrowed by the user.");
                }

                var bookDomainModel = await bookRepository.DeleteBookAsync(id);

                if (bookDomainModel == null)
                {
                    return NotFound();
                }

                var bookDTO = new BookDTO
                {
                    Id = bookDomainModel.Id,
                    Name = bookDomainModel.Name,
                    Rating = bookDomainModel.Rating,
                    Author = bookDomainModel.Author,
                    Genre = bookDomainModel.Genre,
                    Description = bookDomainModel.Description,
                    LentByUserId = bookDomainModel.LentByUserId,
                    CurrentlyBorrowedByUserId = bookDomainModel.CurrentlyBorrowedByUserId
                };

                return Ok(bookDTO);
            }
            catch (Exception ex)
            {
                
                Console.WriteLine("An error occured while deleting the book");
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }


        }
    }
}
