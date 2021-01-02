using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarBlingRent
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    [EnableCors("EntireWorld")]
    public class AuthController : ControllerBase, IDisposable
    {

        private readonly UsersLogic logic = new UsersLogic();//= new UsersLogic();
        private readonly JwtHelper jwtHelper;

        public AuthController(JwtHelper jwtHelper)
        {
            this.jwtHelper = jwtHelper;
        }


        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
        public IActionResult AddUser([FromForm] UserModel userModel)
        {
            if (logic.IsUsernameExists(userModel.UserName))
                return BadRequest("Username already taken");

            userModel.Password = HashPasswordHelper.HashPasswordSHA512(userModel.Password);


            logic.AddUser(userModel);

            userModel.JwtToken = jwtHelper.GetJwtToken(userModel.UserName, userModel.Role);

            userModel.Password = null;

            return Created("api/users/" + userModel.ID, userModel);
        }


        [HttpPost]
        [AllowAnonymous]
        [Route("{login}")]
        public IActionResult Login(CredentialsModel credentials)
        {
            UserModel user = logic.GetUserByCredentials(credentials);

            if (user == null)
                return Unauthorized("Incorrect username or password");

            user.JwtToken = jwtHelper.GetJwtToken(user.UserName, user.Role);

            user.Password = null;

            return Ok(user);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public IActionResult GetAllUsers()
        {
            try
            {
                List<UserModel> users = logic.GetAllUsers();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetOneUser(int id)
        {
            try
            {
                UserModel user = logic.GetOneUser(id);

                if (user == null)
                    return NotFound($"id {id} not found");

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }



        [HttpPatch]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdatePartialUser(int id, [FromForm] UserModel userModel)
        {
            try
            {
                userModel.ID = id;

                UserModel updatedUser = logic.UpdatePartialUser(userModel);

                if (updatedUser == null)
                    return NotFound($"id {id} not found");

                return Ok(updatedUser);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpGet]
        [Route("images/{fileName}")]
        [AllowAnonymous]
        public IActionResult GetImage(string fileName)
        {

            try
            {
                FileStream fileStream = System.IO.File.OpenRead("Uploads/" + fileName);
                return File(fileStream, "image/jpeg");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteUser(int id)
        {
            try
            {
                logic.DeleteUser(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        public void Dispose()
        {
            logic.Dispose();
        }


    }
}
