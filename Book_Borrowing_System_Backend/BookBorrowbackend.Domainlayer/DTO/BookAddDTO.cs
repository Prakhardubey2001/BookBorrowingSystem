using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookBorrowbackend.Domainlayer.DTO
{
    
    public class BookAddDTO
    {
        [Required]
        [StringLength(50, ErrorMessage = "the length of the name should not be greater than 50 characters")]
        [RegularExpression(@"^[a-zA-Z][a-zA-Z\d\s]{0,}[a-zA-Z\d]$", ErrorMessage = "The Name should start with an alphabet and can contain alphabets, spaces, and digits, but should have at least 2 characters excluding space as the second character.")]

        public string Name { get; set; }
        [Required]
        [RegularExpression(@"^[0-5]$", ErrorMessage = "Rating must be a number from 0 to 5")]

        public int Rating { get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-Z\s]*$", ErrorMessage = "Author Name should only contain alphabets and spaces")]
        [StringLength(50, ErrorMessage = "Author name length cannot exceed 50 characters")]
        public string Author { get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-Z\s]*$", ErrorMessage = "Genre should  Only contain alphabets and spaces are allowed ")]
        [StringLength(50, ErrorMessage = "Genre cannot exceed 50 characters")]
        public string Genre { get; set; }

        [Required]
        [StringLength(500,ErrorMessage ="The description should have more than 500 characters ")]
        public string Description { get; set; }
        public bool Is_Book_Available { get; set; } = true;
    }
}
