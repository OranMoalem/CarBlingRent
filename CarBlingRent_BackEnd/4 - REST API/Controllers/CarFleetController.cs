using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarBlingRent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarFleetController : ControllerBase
    {

        private readonly CarFleetLogic logic = new CarFleetLogic();

        [HttpGet]
        public IActionResult GetAllCarFleet()
        {
            try
            {
                List<CarFleetModel> carFleet = logic.GetAllCarFleet();
                return Ok(carFleet);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetOneCarInFleet(int id)
        {
            try
            {
                CarFleetModel carFleet = logic.GetOneCarInFleet(id);

                if (carFleet == null)
                    return NotFound($"id {id} not found");

                return Ok(carFleet);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("{new}")]
        public IActionResult AddCarToFleet(CarFleetModel carFleetModel)
        {
            try
            {
                CarFleetModel addedCarFleet = logic.AddCar(carFleetModel);
                return Created("api/carfleet/" + addedCarFleet.ID, addedCarFleet);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPatch]
        [Route("{id}")]
        public IActionResult UpdatePartialCarFleet(int id, CarFleetModel carFleetModel)
        {
            try
            {
                carFleetModel.ID = id;

                CarFleetModel updatedCarFleet = logic.UpdatePartialCarFleet(carFleetModel);

                if (updatedCarFleet == null)
                    return NotFound($"id {id} not found");

                return Ok(updatedCarFleet);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteCarFleet(int id)
        {
            try
            {
                logic.DeleteCarFleet(id);
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
