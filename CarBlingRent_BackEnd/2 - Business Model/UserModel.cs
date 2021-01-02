using Microsoft.AspNetCore.Http;
using System;

namespace CarBlingRent
{
    public class UserModel
    {
        public int ID { get; set; }
        public string FullName { get; set; }
        public string IdentityCard { get; set; }
        public string UserName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public IFormFile? Image { get; set; }

        // The name of the image will be saved in the database
        public string? ImageFileName { get; set; }

        // Default permission : User
        public string Role { get; set; } = "User";
        public string JwtToken { get; set; }

        public UserModel()
        {
        }

        public UserModel(User user)
        {
            ID = user.UserId;
            FullName = user.UserFullName;
            IdentityCard = user.Id;
            UserName = user.UserName;
            DateOfBirth = user.UserIdateOfBirth;
            Gender = user.UserGender;
            Email = user.UserEmail;
            Password = user.UserIpassword;
            ImageFileName = user.UserImage;
            Role = user.UserPermission;
        }

        public User ConvertToUser()
        {
            User user = new User
            {
                UserId = ID,
                UserFullName = FullName,
                Id = IdentityCard,
                UserName = UserName,
                UserIdateOfBirth = DateOfBirth,
                UserGender = Gender,
                UserEmail = Email,
                UserIpassword = Password,
                UserImage = ImageFileName,
                UserPermission = Role
            };
            return user;
        }
    }
}
