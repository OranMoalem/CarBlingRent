import { environment } from 'src/environments/environment';
import { store } from './../redux/store';
import { CarFleetModel } from './../../models/car-fleet.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActionType } from '../redux/action-type';

@Injectable({
    providedIn: 'root'
})
export class CarFleetService {

    constructor(private httpClient: HttpClient) { }

    public async loadAllCarFleetAsync(): Promise<boolean> {
        try {
            const carFleet = await this.httpClient.get<CarFleetModel[]>(environment.baseUrl+"/carfleet").toPromise();
            store.dispatch({ type: ActionType.GetAllCarFleet, payload: carFleet });
            return true;
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
            return false;
        }
    }

    public async addOneCarToFleetToServer(carFleet: CarFleetModel): Promise<boolean> {
        try {
            const addedCarFleet = await this.httpClient.post<CarFleetModel>(environment.baseUrl+"/carfleet/new", carFleet).toPromise();
            store.dispatch({ type: ActionType.AddCarToFleet, payload: addedCarFleet });
            return true;
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
            return false;
        }
    }

    public async deleteCarFromFleet(id: number): Promise<undefined> {
        try {
            const observable = await this.httpClient.delete<undefined>(environment.baseUrl+"/carfleet" + "/" + id);
            return observable.toPromise();
        }
        catch (err) {
            alert(err.message);
        }
    }

    public async getOneCarFromFleet(id: number): Promise<CarFleetModel> {
        try {
            const observable = this.httpClient.get<CarFleetModel>(environment.baseUrl+"/carfleet" + "/" + id);
            return observable.toPromise();
        }
        catch (err) {
            alert(err.message);
        }
    }

    public async updateCarFleet(carFleet: CarFleetModel): Promise<boolean> {
        try {
            const updatedCarFleet = await this.httpClient.patch<CarFleetModel>(environment.baseUrl+"/carfleet" + "/" + carFleet.id, carFleet).toPromise();
            store.dispatch({ type: ActionType.UpdateCarFleet, payload: updatedCarFleet });
            return true;
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
            return false;
        }
    }
}