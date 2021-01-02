namespace CarBlingRent
{
    public class BranchModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public decimal Longitude { get; set; }
        public decimal Latitude { get; set; }

        public BranchModel()
        {
        }

        public BranchModel(Branch branch)
        {
            ID = branch.BranchId;
            Name = branch.BranchName;
            Address = branch.BranchAddress;
            Longitude = branch.BranchLongitude;
            Latitude = branch.BranchLatitude;
        }

        public Branch ConvertToBranch()
        {
            Branch branch = new Branch
            {
                BranchId = ID,
                BranchName = Name,
                BranchAddress = Address,
                BranchLongitude = Longitude,
                BranchLatitude = Latitude
            };
            return branch;
        }
    }
}
