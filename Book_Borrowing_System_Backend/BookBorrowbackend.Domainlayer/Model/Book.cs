using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Book_Borrowing_System_Backend.Model
{
    public class Book
    {
        [Key]
        public int Id { get; set; }
        [StringLength(50, ErrorMessage = "the length of the name should not be greater than 50 characters")]
        [RegularExpression(@"^[a-zA-Z][a-zA-Z\d\s]{0,}[a-zA-Z\d]$", ErrorMessage = "The Name should start with an alphabet and can contain alphabets, spaces, and digits, but should have at least 2 characters excluding space as the second character.")]
        public string Name { get; set; }
        public int Rating { get; set; }
        public string Author { get; set; }
        public string Genre { get; set; }
        public string Description { get; set; }
        public bool Is_Book_Available { get; set; } = true;

        [ForeignKey("LentByUserId")]
        public string LentByUserId { get; set; }
        //Navigation Property 
        public BookBorrowUser LentByUser { get; set; }
        public string CurrentlyBorrowedByUserId { get; set; } = null;

    }
}
