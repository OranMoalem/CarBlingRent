using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarBlingRent
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("EntireWorld")]
    public class BranchesController : ControllerBase, IDisposable
    {

        private readonly BranchesLogic logic = new BranchesLogic();

        [HttpGet]
        public IActionResult GetAllBranches()
        {
            try
            {
                List<BranchModel> branches = logic.GetAllBranches();
                return Ok(branches);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetOneBranch(int id)
        {
            try
            {
                BranchModel branch = logic.GetOneBranch(id);

                if (branch == null)
                    return NotFound($"id {id} not found");

                return Ok(branch);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("{new}")]
        public IActionResult AddBranch(BranchModel branchModel)
        {
            try
            {
                BranchModel addedBranch = logic.AddBranch(branchModel);
                return Created("api/branches/" + addedBranch.ID, addedBranch);
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
