using Microsoft.AspNetCore.Http;

namespace CarBlingRent
{
    public class CarRentalModel
    {
        public int ID { get; set; }
        public int CarNumber { get; set; } //done
        public int CarFleetID { get; set; }
        public int CurrentMileage { get; set; }
        public IFormFile? Image { get; set; }
        public string? ImageFileName { get; set; }
        public bool IsProperForRent { get; set; }
        public bool IsAvailableForRent { get; set; }
        public int BranchID { get; set; }

        public CarRentalModel() { }

        public CarRentalModel(CarRental carRental)
        {
            ID = carRental.CarId;
            CarNumber = carRental.CarNumber;
            CarFleetID = carRental.CarFleetId;
            CurrentMileage = carRental.CurrentMileage;
            ImageFileName = carRental.CarPicture;
            IsProperForRent = carRental.IsProperForRent;
            IsAvailableForRent = carRental.IsAvailableForRent;
            BranchID = carRental.BranchId;
        }

        public CarRental ConvertToCarRental()
        {
            CarRental carRental = new CarRental
            {
                CarId = ID,
                CarNumber = CarNumber,
                CarFleetId = CarFleetID,
                CurrentMileage = CurrentMileage,
                CarPicture = ImageFileName,
                IsProperForRent = IsProperForRent,
                IsAvailableForRent = IsAvailableForRent,
                BranchId = BranchID,
            };
            return carRental;
        }
    }
}

