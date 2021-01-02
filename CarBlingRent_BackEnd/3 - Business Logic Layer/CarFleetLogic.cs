using System.Collections.Generic;
using System.Linq;

namespace CarBlingRent
{
    public class CarFleetLogic : BaseLogic
    {
        public List<CarFleetModel> GetAllCarFleet()
        {
            return DB.CarFleets.Select(c => new CarFleetModel(c)).ToList();
        }

        public CarFleetModel GetOneCarInFleet(int id)
        {
            return DB.CarFleets.Where(c => c.CarFleetId == id).Select(c => new CarFleetModel(c)).SingleOrDefault();
        }

        public CarFleetModel AddCar(CarFleetModel carFleetModel)
        {
            CarFleet carFleet = carFleetModel.ConvertToCarFleet();
            DB.CarFleets.Add(carFleet);
            DB.SaveChanges();
            carFleetModel.ID = carFleet.CarFleetId;
            return carFleetModel;
        }

        public CarFleetModel UpdatePartialCarFleet(CarFleetModel carFleetModel)
        {
            CarFleet carToUpdate = DB.CarFleets.SingleOrDefault(c => c.CarFleetId == carFleetModel.ID);

            if (carToUpdate == null)
                return null;

            if (carToUpdate.ManufacturerId != null)
            {
                carToUpdate.ManufacturerId = carFleetModel.ManufacturerID;
            }

            if (carToUpdate.Model != null)
            {
                carToUpdate.Model = carFleetModel.Model;
            }

            if (carToUpdate.DailyCost != null)
            {
                carToUpdate.DailyCost = carFleetModel.DailyCost;
            }

            if (carToUpdate.LateDayCost != null)
            {
                carToUpdate.LateDayCost = carFleetModel.LateDayCost;
            }

            if (carToUpdate.YearOfManufacturer != null)
            {
                carToUpdate.YearOfManufacturer = carFleetModel.YearOfManufacturer;
            }

            if (carToUpdate.Gear != null)
            {
                carToUpdate.Gear = carFleetModel.Gear;
            }
            DB.SaveChanges();
            return carFleetModel;
        }

        public void DeleteCarFleet(int id)
        {
            CarFleet carToDelete = DB.CarFleets.SingleOrDefault(c => c.CarFleetId == id);

            if (carToDelete == null)
                return;

            DB.CarFleets.Remove(carToDelete);
            DB.SaveChanges();
        }
    }
}
