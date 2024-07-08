using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookBorrowbackend.Domainlayer.DTO
{
    public class RequestForRegisterDTO
    {
        [Required]
        [StringLength(50, ErrorMessage = "the length of Name should not exceed 50 characters")]
        [RegularExpression(@"^[a-zA-Z][a-zA-Z\d\s]{0,}[a-zA-Z\d]$", ErrorMessage = "The Name should start with an alphabet and can contain alphabets, spaces, and digits, but should have at least 2 characters excluding space as the second character.")]

        public string Name { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", ErrorMessage = "Invalid username format it is of the same format as that of a email")]

        public string Username { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
