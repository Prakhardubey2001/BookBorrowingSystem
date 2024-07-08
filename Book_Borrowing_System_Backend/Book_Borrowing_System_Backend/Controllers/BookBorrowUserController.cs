using Book_Borrowing_System_Backend.Model;
using BookBorrowbackend.Domainlayer.DTO;
using BookBorrowbackend.Domainlayer.IRepository;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Book_Borrowing_System_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookBorrowUserController:ControllerBase
    {
        private readonly IAuthServiceRepository authServiceRepository;
         private readonly UserManager<BookBorrowUser> bookborrowuser;
        public BookBorrowUserController(IAuthServiceRepository authServiceRepository, UserManager<BookBorrowUser> bookborrowuser)
        {
            this.authServiceRepository = authServiceRepository;
            this.bookborrowuser = bookborrowuser;
        }
        // To Regiter the user
        [HttpPost("RegisterUser")]
        public async Task<IActionResult> Register([FromBody] RequestForRegisterDTO RequestforRegisterDTO)
        {
            
            try
            {
                var result = await authServiceRepository.RegisterUser(RequestforRegisterDTO);

                if (result)
                {
                    return Ok("BookBorrowUser Registered");
                }

                return BadRequest("Something went wrong. Please Retry");
            }
            catch (Exception ex)
            {
                
                Console.WriteLine("Some error occured in registering the user");
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
        // To login the the user
        [HttpPost("LoginUser")]
        public async Task<IActionResult> Login(RequestForLoginDTO RequestforLoginDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Username or password incorrect. Please retry");
                }

                var user = await authServiceRepository.Login(RequestforLoginDTO);

                if (user != null)
                {
                    var tokenString = authServiceRepository.GenerateTokenString(RequestforLoginDTO, user);
                    var response = new ResponseForLoginDTO
                    {
                        JwtToken = tokenString
                    };

                    return Ok(new
                    {
                        Message = "BookBorrowUser Logged in Successfully",
                        Token = response
                    });
                }

                return BadRequest("Username or password incorrect. Please retry");
            }
            catch (Exception ex)
            {
               
                Console.WriteLine("Some error occured while login the user");
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        // to get the details of the user
        [HttpGet("GetUserDetails")]
        public async Task<IActionResult> GetDetailsOfLoggedInUser()
        {
         
            try
            {
                if (User.Identity.IsAuthenticated == false)
                {
                    return Unauthorized("Not Logged In. Please login first");
                }

                var user = await bookborrowuser.GetUserAsync(HttpContext.User);

                var getLoggedInUserDTO = new GetLoginUserDTO
                {
                    UserId = user.Id,
                    Username = user.UserName,
                    Name = user.Name,
                    TokensAvailable = user.TokensAvailable
                };

                return Ok(getLoggedInUserDTO);
            }
            catch (Exception ex)
            {
                
                Console.WriteLine($"Some error occured in getting the details of the user");
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }

        }
        [HttpGet("TokensAvailable")]
        public async Task<IActionResult> GetDetailsOfTokenAvialable()
        {
            try
            {
                if (User.Identity.IsAuthenticated == false)
                {
                    return Unauthorized("Not Logged In. Please login first");
                }
                var user = await bookborrowuser.GetUserAsync(HttpContext.User);
                var TokenDTO = new TokenAvilableDTO
                {
                    
                    TokensAvailable = user.TokensAvailable
                };
                return Ok(TokenDTO);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Some error occured in getting the details of the user token please retry");
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
    }

}
