using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarBlingRent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("EntireWorld")]
    public class ManufacturersController : ControllerBase
    {
        private readonly ManufacturersLogic logic = new ManufacturersLogic();

        [HttpGet]
        public IActionResult GetAllManufacturers()
        {
            try
            {
                List<ManufacturerModel> manufacturers = logic.GetAllManufacturers();
                return Ok(manufacturers);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetOneManufacturer(int id)
        {
            try
            {
                ManufacturerModel manufacturer = logic.GetOneManufacturer(id);

                if (manufacturer == null)
                    return NotFound($"id {id} not found");

                return Ok(manufacturer);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("{new}")]
        public IActionResult AddManufacturer(ManufacturerModel manufacturerModel)
        {
            try
            {
                ManufacturerModel addedManufacturer = logic.AddManufacturer(manufacturerModel);
                return Created("api/manufacturers/" + addedManufacturer.ID, addedManufacturer);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult UpdateFullManufacturer(int id, ManufacturerModel manufacturerModel)
        {
            try
            {
                manufacturerModel.ID = id;

                ManufacturerModel updatedManufacturer = logic.UpdateFullManufacturer(manufacturerModel);

                if (updatedManufacturer == null)
                    return NotFound($"id {id} not found");

                return Ok(updatedManufacturer);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteManufacturer(int id)
        {
            try
            {
                logic.DeleteManufacturer(id);
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
