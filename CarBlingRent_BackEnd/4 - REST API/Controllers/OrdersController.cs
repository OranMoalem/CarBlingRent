using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarBlingRent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("EntireWorld")]
    public class OrdersController : ControllerBase
    {
        private readonly OrderLogic logic = new OrderLogic();

        [HttpGet]
        public IActionResult GetAllOrders()
        {
            try
            {
                List<OrderModel> orders = logic.GetAllOrders();
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetOrder(int id)
        {
            try
            {
                OrderModel orderModel = logic.GetOneOrder(id);

                if (orderModel == null)
                    return NotFound($"id {id} not found");

                return Ok(orderModel);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("{new}")]
        [AllowAnonymous]
        public IActionResult AddOrder(OrderModel orderModel)
        {
            try
            {

                OrderModel addedOrder = logic.AddOrder(orderModel);

                return Created("api/orders/" + addedOrder.ID, addedOrder);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPatch]
        [Route("{id}")]
        public IActionResult UpdatePartialOrder(int id, OrderModel orderModel)
        {
            try
            {
                orderModel.ID = id;

                OrderModel updatedOrder = logic.UpdatePartialOrder(orderModel);

                if (updatedOrder == null)
                    return NotFound($"id {id} not found");

                return Ok(updatedOrder);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            try
            {
                logic.DeleteOrder(id);
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
