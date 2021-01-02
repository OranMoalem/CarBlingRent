using System.Collections.Generic;
using System.Linq;

namespace CarBlingRent
{
    public class OrderLogic : BaseLogic
    {
        public List<OrderModel> GetAllOrders()
        {
            return DB.Orders.Select(o => new OrderModel(o)).ToList();
        }

        public OrderModel GetOneOrder(int id)
        {
            return DB.Orders.Where(o => o.OrderId == id).Select(o => new OrderModel(o)).SingleOrDefault();
        }

        public OrderModel AddOrder(OrderModel orderModel)
        {
            Order order = orderModel.ConvertToOrder();
            DB.Orders.Add(order);
            DB.SaveChanges();
            orderModel.ID = order.OrderId;
            return orderModel;
        }

        public OrderModel UpdatePartialOrder(OrderModel orderModel)
        {
            Order orderToUpdate = DB.Orders.SingleOrDefault(o => o.OrderId == orderModel.ID);

            if (orderToUpdate == null)
                return null;


            if (orderToUpdate.StartDate != null)
            {
                orderToUpdate.StartDate = orderModel.StartDate;
            }

            if (orderToUpdate.ReturnDate != null)
            {
                orderToUpdate.ReturnDate = orderModel.ReturnDate;
            }

            if (orderToUpdate.ActualReturnDate == null)
            {
                orderToUpdate.ActualReturnDate = orderModel.ActualReturnDate;
            }

            else if (orderToUpdate.ActualReturnDate != null)
            {
                orderToUpdate.ActualReturnDate = orderModel.ActualReturnDate;
            }

            if (orderToUpdate.UserId != null)
            {
                orderToUpdate.UserId = orderModel.UserID;
            }

            if (orderToUpdate.CarId != null)
            {
                orderToUpdate.CarId = orderModel.CarID;
            }

            DB.SaveChanges();
            return orderModel;
        }

        public void DeleteOrder(int id)
        {
            Order orderToDelete = DB.Orders.SingleOrDefault(o => o.OrderId == id);

            if (orderToDelete == null)
                return;

            DB.Orders.Remove(orderToDelete);
            DB.SaveChanges();
        }
    }
}
