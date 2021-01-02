export class CarFleetModel {

    public constructor(
        public id?: number,
        public manufacturerID?: number,
        public model?: string,
        public dailyCost?: number,
        public lateDayCost?: number,
        public yearOfManufacturer?: number,
        public gear?: string
        ) { }

}