import { OrderModel } from './../../models/order.model';
import { CarRentalModel } from './../../models/car-rental.model';
import { CarFleetModel } from './../../models/car-fleet.model';
import { BranchModel } from './../../models/branch.model';
import { UserModel } from 'src/models/user.model';
import { ManufacturerModel } from './../../models/manufacturer.model';
export class AppState {

    public user: UserModel = null;
    public manufacturers: ManufacturerModel[] = [];
    public branches: BranchModel[] = [];
    public users: UserModel[] = [];
    public carFleet: CarFleetModel[] = [];
    public carRental: CarRentalModel[] = [];
    public orders: OrderModel[] = [];
    public lastError: string;

    constructor() {
        this.user = JSON.parse(sessionStorage.getItem("user"));
    }
}