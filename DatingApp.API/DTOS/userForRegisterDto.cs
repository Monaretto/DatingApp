using System.ComponentModel.DataAnnotations;
namespace DatingApp.API.DTOS
{
    public class userForRegisterDto
    {
        [Required]
        public string username { get; set; }

        [Required]
        [StringLength(16, MinimumLength = 4, ErrorMessage = "Password Cannot be bigger than 16 characters.")]
        public string password { get; set; }
    }
}