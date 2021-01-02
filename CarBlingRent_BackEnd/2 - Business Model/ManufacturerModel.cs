namespace CarBlingRent
{
    public class ManufacturerModel
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public ManufacturerModel() { }

        public ManufacturerModel(Manufacturer manufacturer)
        {
            ID = manufacturer.ManufacturerId;
            Name = manufacturer.ManufacturerName;
        }

        public Manufacturer ConvertToManufacturer()
        {
            Manufacturer manufacturer = new Manufacturer
            {
                ManufacturerId = ID,
                ManufacturerName = Name
            };
            return manufacturer;
        }
    }
}
