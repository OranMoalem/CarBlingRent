import { environment } from 'src/environments/environment';
import { ActionType } from './../redux/action-type';
import { CarRentalModel } from './../../models/car-rental.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { store } from './../redux/store';

@Injectable({
    providedIn: 'root'
})
export class CarRentalService {

    constructor(private httpClient: HttpClient) { }

    public async loadAllCarRentalAsync(): Promise<boolean> {
        try {
            const carRental = await this.httpClient.get<CarRentalModel[]>(environment.baseUrl+"/carrental").toPromise();
            store.dispatch({ type: ActionType.GetAllCarRental, payload: carRental });
            return true;
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
            return false;
        }
    }

    public async addOneCarToRentalToServer(carRental: CarRentalModel): Promise<boolean> {
        try {
            const formData = new FormData();
            formData.append("carNumber", carRental.carNumber.toString());
            formData.append("carFleetID", carRental.carFleetID.toString());
            formData.append("currentMileage", carRental.currentMileage.toString());
            formData.append("isProperForRent", carRental.isProperForRent.toString());
            formData.append("isAvailableForRent", carRental.isAvailableForRent.toString());
            formData.append("branchID", carRental.branchID.toString());
            formData.append("image", carRental.image, carRental.imageFileName);
            const addedCarRental = await this.httpClient.post<CarRentalModel>(environment.baseUrl+"/carrental/new", formData).toPromise();
            store.dispatch({ type: ActionType.AddCarToRental, payload: addedCarRental });
            return true;
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
            return false;
        }
    }

    public async updateCarRental(carRental: CarRentalModel, isImageAdded: boolean): Promise<boolean> {
        try {
            const formData = new FormData();
            formData.append("carNumber", carRental.carNumber.toString());
            formData.append("carFleetID", carRental.carFleetID.toString());
            formData.append("currentMileage", carRental.currentMileage.toString());
            formData.append("isProperForRent", carRental.isProperForRent.toString());
            formData.append("isAvailableForRent", carRental.isAvailableForRent.toString());
            formData.append("branchID", carRental.branchID.toString());
            if (isImageAdded) {
                formData.append("image", carRental.image, carRental.imageFileName);
            }
            const updatedCarRental = await this.httpClient.patch<CarRentalModel>(environment.baseUrl+"/carrental" + "/" + carRental.id, formData).toPromise();
            store.dispatch({ type: ActionType.UpdateCarRental, payload: updatedCarRental });
            return true;
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
            return false;
        }
    }

    public async deleteCarFromRental(id: number): Promise<undefined> {
        try {
            const observable = await this.httpClient.delete<undefined>(environment.baseUrl+"/carrental" + "/" + id);
            return observable.toPromise();
        }
        catch (err) {
            alert(err.message);
        }
    }

    public async getOneCarFromRental(id: number): Promise<CarRentalModel> {
        try {
            const observable = await this.httpClient.get<CarRentalModel>(environment.baseUrl+"/carrental" + "/" + id);
            return observable.toPromise();
        }
        catch (err) {
            alert(err.message);
        }
    }
}