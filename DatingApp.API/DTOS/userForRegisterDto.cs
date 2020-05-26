using System.ComponentModel.DataAnnotations;
using System;
namespace DatingApp.API.DTOS
{
    public class userForRegisterDto
    {
        [Required]
        public string username { get; set; }

        [Required]
        [StringLength(16, MinimumLength = 4, ErrorMessage = "Password Cannot be bigger than 16 characters.")]
        public string password { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public string KnownAs { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Country { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastActive { get; set; }

        public userForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}