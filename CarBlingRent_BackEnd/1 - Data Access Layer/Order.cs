using System;
#nullable disable

namespace CarBlingRent
{
    public partial class Order
    {
        public int OrderId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public DateTime? ActualReturnDate { get; set; }
        public int UserId { get; set; }
        public int CarId { get; set; }

        public virtual CarRental Car { get; set; }
        public virtual User User { get; set; }
    }
}
