using System.Collections.Generic;
#nullable disable

namespace CarBlingRent
{
    public partial class Manufacturer
    {
        public Manufacturer()
        {
            CarFleets = new HashSet<CarFleet>();
        }

        public int ManufacturerId { get; set; }
        public string ManufacturerName { get; set; }

        public virtual ICollection<CarFleet> CarFleets { get; set; }
    }
}
