using System.Collections.Generic;
#nullable disable

namespace CarBlingRent
{
    public partial class CarRental
    {
        public CarRental()
        {
            Orders = new HashSet<Order>();
        }

        public int CarId { get; set; }
        public int CarNumber { get; set; }
        public int CarFleetId { get; set; }
        public int CurrentMileage { get; set; }
        public string CarPicture { get; set; }
        public bool IsProperForRent { get; set; }
        public bool IsAvailableForRent { get; set; }
        public int BranchId { get; set; }

        public virtual Branch Branch { get; set; }
        public virtual CarFleet CarFleet { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
