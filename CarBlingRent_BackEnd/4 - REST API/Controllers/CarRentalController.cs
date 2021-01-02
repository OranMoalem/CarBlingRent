using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarBlingRent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarRentalController : ControllerBase
    {
        private readonly CarRentalLogic logic = new CarRentalLogic();

        [HttpGet]
        public IActionResult GetAllCarRental()
        {
            try
            {
                List<CarRentalModel> carRental = logic.GetAllCarRental();
                return Ok(carRental);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetOneCarRental(int id)
        {
            try
            {
                CarRentalModel carRental = logic.GetOneCarRental(id);

                if (carRental == null)
                    return NotFound($"id {id} not found");

                return Ok(carRental);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("{new}")]
        public IActionResult AddCarRental([FromForm] CarRentalModel carRentalModel)
        {
            try
            {
                CarRentalModel addedCarRental = logic.AddCarRental(carRentalModel);
                return Created("api/CarRental/" + addedCarRental.ID, addedCarRental);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPatch]
        [Route("{id}")]
        public IActionResult UpdateFullCarRental(int id, [FromForm] CarRentalModel carRentalModel)
        {
            try
            {
                carRentalModel.ID = id;

                CarRentalModel updatedCarRental = logic.UpdateFullCarRental(carRentalModel);

                if (updatedCarRental == null)
                    return NotFound($"id {id} not found");

                return Ok(updatedCarRental);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteCarRental(int id)
        {
            try
            {
                logic.DeleteCarRental(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("images/{fileName}")]
        public IActionResult GetImage(string fileName)
        {

            try
            {
                FileStream fileStream = System.IO.File.OpenRead("Cars-Uploads/" + fileName);
                return File(fileStream, "image/jpeg");// לבדוק מה לרשום שיהיה לכל תמונה שהיא במקום jepg
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
