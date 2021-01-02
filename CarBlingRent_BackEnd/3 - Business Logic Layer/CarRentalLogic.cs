using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace CarBlingRent
{
    public class CarRentalLogic : BaseLogic
    {
        public List<CarRentalModel> GetAllCarRental()
        {
            return DB.CarRentals.Select(c => new CarRentalModel(c)).ToList();
        }

        public CarRentalModel GetOneCarRental(int id)
        {
            return DB.CarRentals.Where(c => c.CarId == id).Select(c => new CarRentalModel(c)).SingleOrDefault();
        }

        public CarRentalModel AddCarRental(CarRentalModel carRentalModel)
        {
            // Save the image on the server side
            string extension = Path.GetExtension(carRentalModel.Image.FileName);
            carRentalModel.ImageFileName = Guid.NewGuid() + extension;
            using (FileStream fileStream = File.Create("Cars-Uploads/" + carRentalModel.ImageFileName))
            {
                carRentalModel.Image.CopyTo(fileStream);
            }
            carRentalModel.Image = null;
            CarRental carRental = carRentalModel.ConvertToCarRental();
            DB.CarRentals.Add(carRental);
            DB.SaveChanges();
            carRentalModel.ID = carRental.CarId;
            return carRentalModel;
        }

        public CarRentalModel UpdateFullCarRental(CarRentalModel carRentalModel)
        {
            // If a new image has not been added to the update,
            // do not save any image again on the server side and use the old image.
            bool isIamgeAdded = false;
            if (carRentalModel.Image != null)
            {
                string extension = Path.GetExtension(carRentalModel.Image.FileName);
                carRentalModel.ImageFileName = Guid.NewGuid() + extension;
                using (FileStream fileStream = File.Create("Cars-Uploads/" + carRentalModel.ImageFileName))
                {
                    carRentalModel.Image.CopyTo(fileStream);
                }

                carRentalModel.Image = null;
                isIamgeAdded = true;
            }

            CarRental carToUpdate = DB.CarRentals.SingleOrDefault(c => c.CarId == carRentalModel.ID);

            if (carToUpdate == null)
                return null;

            if (carToUpdate.CarNumber != null)
            {
                carToUpdate.CarNumber = carRentalModel.CarNumber;
            }

            if (carToUpdate.CarFleetId != null)
            {
                carToUpdate.CarFleetId = carRentalModel.CarFleetID;
            }

            if (carToUpdate.CurrentMileage != null)
            {
                carToUpdate.CurrentMileage = carRentalModel.CurrentMileage;
            }

            // Update the image name in the database, if one has been added
            if (isIamgeAdded)
            {
                carToUpdate.CarPicture = carRentalModel.ImageFileName;
            }

            if (carToUpdate.IsProperForRent != null)
            {
                carToUpdate.IsProperForRent = carRentalModel.IsProperForRent;
            }

            if (carToUpdate.IsAvailableForRent != null)
            {
                carToUpdate.IsAvailableForRent = carRentalModel.IsAvailableForRent;
            }

            if (carToUpdate.BranchId != null)
            {
                carToUpdate.BranchId = carRentalModel.BranchID;
            }

            DB.SaveChanges();
            return carRentalModel;
        }

        public void DeleteCarRental(int id)
        {
            CarRental carRentalToDelete = DB.CarRentals.SingleOrDefault(c => c.CarId == id);

            if (carRentalToDelete == null)
                return;

            DB.CarRentals.Remove(carRentalToDelete);
            DB.SaveChanges();
        }
    }
}