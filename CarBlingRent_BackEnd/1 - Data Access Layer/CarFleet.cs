using System.Collections.Generic;

#nullable disable

namespace CarBlingRent
{
    public partial class CarFleet
    {
        public CarFleet()
        {
            CarRentals = new HashSet<CarRental>();
        }

        public int CarFleetId { get; set; }
        public int ManufacturerId { get; set; }
        public string Model { get; set; }
        public decimal DailyCost { get; set; }
        public decimal LateDayCost { get; set; }
        public short YearOfManufacturer { get; set; }
        public string Gear { get; set; }

        public virtual Manufacturer Manufacturer { get; set; }
        public virtual ICollection<CarRental> CarRentals { get; set; }
    }
}
