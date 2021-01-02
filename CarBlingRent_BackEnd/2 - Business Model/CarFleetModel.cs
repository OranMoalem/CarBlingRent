using System;
using System.Collections.Generic;
using System.Text;

namespace CarBlingRent
{
    public class CarFleetModel
    {
        public int ID { get; set; }
        public int ManufacturerID { get; set; } //done
        public string Model { get; set; }
        public decimal DailyCost { get; set; }
        public decimal LateDayCost { get; set; }
        public short YearOfManufacturer { get; set; }
        public string Gear { get; set; }

        public CarFleetModel() { }

        public CarFleetModel(CarFleet carFleet)
        {

            ID = carFleet.CarFleetId;
            ManufacturerID = carFleet.ManufacturerId;
            Model = carFleet.Model;
            DailyCost = carFleet.DailyCost;
            LateDayCost = carFleet.LateDayCost;
            YearOfManufacturer = carFleet.YearOfManufacturer;
            Gear = carFleet.Gear;
        }

        public CarFleet ConvertToCarFleet()
        {
            CarFleet carFleet = new CarFleet
            {
                CarFleetId = ID,
                ManufacturerId = ManufacturerID,
                Model = Model,
                DailyCost = DailyCost,
                LateDayCost = LateDayCost,
                YearOfManufacturer = YearOfManufacturer,
                Gear = Gear
            };
            return carFleet;
        }
    }
}
