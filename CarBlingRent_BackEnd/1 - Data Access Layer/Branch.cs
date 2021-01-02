using System.Collections.Generic;

#nullable disable

namespace CarBlingRent
{
    public partial class Branch
    {
        public Branch()
        {
            CarRentals = new HashSet<CarRental>();
        }

        public int BranchId { get; set; }
        public string BranchName { get; set; }
        public string BranchAddress { get; set; }
        public decimal BranchLongitude { get; set; }
        public decimal BranchLatitude { get; set; }

        public virtual ICollection<CarRental> CarRentals { get; set; }
    }
}
