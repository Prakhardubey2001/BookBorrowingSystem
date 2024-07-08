using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookBorrowbackend.Domainlayer.DTO
{
    public class GetLoginUserDTO
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public int TokensAvailable { get; set; }
    }
}
