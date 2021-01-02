using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;

namespace CarBlingRent
{
    public class UsersLogic : BaseLogic
    {
        public List<UserModel> GetAllUsers()
        {
            return DB.Users.Select(u => new UserModel(u)).ToList();
        }

        // Check if we have already used registered with the username
        public bool IsUsernameExists(string username)
        {
            return DB.Users.Any(u => u.UserName == username);
        }

        public UserModel AddUser(UserModel userModel)
        {
            // Allow the user to register without an image
            if (userModel.Image != null)
            {
                string extension = Path.GetExtension(userModel.Image.FileName);
                userModel.ImageFileName = Guid.NewGuid() + extension;
                using (FileStream fileStream = File.Create("Uploads/" + userModel.ImageFileName))
                {
                    userModel.Image.CopyTo(fileStream);
                }

                userModel.Image = null;
            }
            User user = userModel.ConvertToUser();
            DB.Users.Add(user);
            DB.SaveChanges();
            userModel.ID = user.UserId;
            return userModel;
        }

        public UserModel GetOneUser(int id)
        {
            return DB.Users.Where(u => u.UserId == id).Select(u => new UserModel(u)).SingleOrDefault();
        }

        public UserModel GetUserByCredentials(CredentialsModel credentials)
        {
            return DB.Users.Select(u => new UserModel(u)).ToList().SingleOrDefault(u => u.UserName == credentials.Username && u.Password == HashPasswordHelper.HashPasswordSHA512(credentials.Password));
        }

        public UserModel UpdatePartialUser(UserModel userModel)
        {
            // If a new image has not been added to the update,
            // do not save any image again on the server side and use the old image.
            bool isIamgeAdded = false;
            if (userModel.Image != null)
            {
                string extension = Path.GetExtension(userModel.Image.FileName);
                userModel.ImageFileName = Guid.NewGuid() + extension;
                using (FileStream fileStream = File.Create("Uploads/" + userModel.ImageFileName))
                {
                    userModel.Image.CopyTo(fileStream);
                }

                userModel.Image = null;
                isIamgeAdded = true;
            }

            User userToUpdate = DB.Users.SingleOrDefault(u => u.UserId == userModel.ID);

            if (userToUpdate == null)
                return null;

            if (userToUpdate.UserFullName != null)
            {
                userToUpdate.UserFullName = userModel.FullName;
            }

            if (userToUpdate.Id != null)
            {
                userToUpdate.Id = userModel.IdentityCard;
            }

            if (userToUpdate.UserName != null)
            {
                userToUpdate.UserName = userModel.UserName;
            }


            if (userToUpdate.UserIdateOfBirth != null)
            {
                userToUpdate.UserIdateOfBirth = userModel.DateOfBirth;
            }

            if (userToUpdate.UserGender != null)
            {
                userToUpdate.UserGender = userModel.Gender;
            }

            if (userToUpdate.UserEmail != null)
            {
                userToUpdate.UserEmail = userModel.Email;
            }

            if (userToUpdate.UserIpassword != null)
            {
                userToUpdate.UserIpassword = userModel.Password;
            }

            // Update the image name in the database, if one has been added
            if (isIamgeAdded)
            {
                userToUpdate.UserImage = userModel.ImageFileName;
            }

            if (userToUpdate.UserPermission != null)
            {
                userToUpdate.UserPermission = userModel.Role;
            }
            DB.SaveChanges();

            return userModel;
        }

        public void DeleteUser(int id)
        {
            User userToDelete = DB.Users.SingleOrDefault(u => u.UserId == id);

            if (userToDelete == null)
                return;

            DB.Users.Remove(userToDelete);
            DB.SaveChanges();
        }
    }
}
