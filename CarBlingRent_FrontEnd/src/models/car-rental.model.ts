export class CarRentalModel {

    public constructor(
        public id?: number,
        public carNumber?: number,
        public carFleetID?: number,
        public currentMileage?: number,
        public image?:File,
        public imageFileName?:string,
        public isProperForRent?: boolean,
        public isAvailableForRent?: boolean,
        public branchID?: number
        ) { }

}