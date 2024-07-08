using Microsoft.AspNetCore.Identity;

namespace Book_Borrowing_System_Backend.Model
{
    public class BookBorrowUser:IdentityUser

    {
        public string Name { get; set; }
        public int TokensAvailable { get; set; } = 4;
    }
}
