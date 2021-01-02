using System.Collections.Generic;
using System.Linq;

namespace CarBlingRent
{
    public class ManufacturersLogic : BaseLogic
    {
        public List<ManufacturerModel> GetAllManufacturers()
        {
            return DB.Manufacturers.Select(m => new ManufacturerModel(m)).ToList();
        }

        public ManufacturerModel GetOneManufacturer(int id)
        {
            return DB.Manufacturers.Where(m => m.ManufacturerId == id).Select(m => new ManufacturerModel(m)).SingleOrDefault();
        }

        public ManufacturerModel AddManufacturer(ManufacturerModel manufacturerModel)
        {
            Manufacturer manufacturer = manufacturerModel.ConvertToManufacturer();
            DB.Manufacturers.Add(manufacturer);
            DB.SaveChanges();
            manufacturerModel.ID = manufacturer.ManufacturerId;
            return manufacturerModel;
        }

        public ManufacturerModel UpdateFullManufacturer(ManufacturerModel manufacturerModel)
        {
            Manufacturer manufacturer = DB.Manufacturers.SingleOrDefault(m => m.ManufacturerId == manufacturerModel.ID);

            if (manufacturer == null)
                return null;

            manufacturer.ManufacturerName = manufacturerModel.Name;

            DB.SaveChanges();

            return manufacturerModel;
        }

        public void DeleteManufacturer(int id)
        {
            Manufacturer manufacturerToDelete = DB.Manufacturers.SingleOrDefault(m => m.ManufacturerId == id);

            if (manufacturerToDelete == null)
                return;

            DB.Manufacturers.Remove(manufacturerToDelete);
            DB.SaveChanges();
        }
    }
}
