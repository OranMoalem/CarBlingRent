using System;

namespace CarBlingRent
{
    public class OrderModel
    {
        public int ID { get; set; }
        public DateTime StartDate { get; set; } //done
        public DateTime ReturnDate { get; set; }
        public DateTime? ActualReturnDate { get; set; }
        public int UserID { get; set; }
        public int CarID { get; set; }

        public OrderModel() { }

        public OrderModel(Order order)
        {
            ID = order.OrderId;
            StartDate = order.StartDate;
            ReturnDate = order.ReturnDate;
            ActualReturnDate = order.ActualReturnDate;
            UserID = order.UserId;
            CarID = order.CarId;
        }

        public Order ConvertToOrder()
        {
            Order order = new Order
            {
                OrderId = ID,
                StartDate = StartDate,
                ReturnDate = ReturnDate,
                ActualReturnDate = ActualReturnDate,
                UserId = UserID,
                CarId = CarID
            };
            return order;
        }
    }
}

