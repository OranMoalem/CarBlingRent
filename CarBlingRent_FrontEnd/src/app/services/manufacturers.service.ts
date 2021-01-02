import { environment } from 'src/environments/environment';
import { store } from './../redux/store';
import { ActionType } from './../redux/action-type';
import { ManufacturerModel } from './../../models/manufacturer.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ManufacturersService {

    constructor(private httpClient: HttpClient) { }

    public async loadAllManufacturersFromServerAsync(): Promise<boolean> {
        try {
            const manufacturers = await this.httpClient.get<ManufacturerModel[]>(environment.baseUrl+"/manufacturers").toPromise();
            store.dispatch({ type: ActionType.GetAllManufacturers, payload: manufacturers });
            return true;
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
            return false;
        }
    }

    public async addManufacturerToServer(manufacturer: ManufacturerModel): Promise<boolean> {
        try {
            const addedManufacturer = await this.httpClient.post<ManufacturerModel>(environment.baseUrl+"/manufacturers/new", manufacturer).toPromise();
            store.dispatch({ type: ActionType.AddManufacturer, payload: addedManufacturer });
            return true;
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
            return false;
        }
    }

    public async deleteManufacturer(id: number): Promise<undefined> {
        try {
            const observable = await this.httpClient.delete<undefined>(environment.baseUrl+"/manufacturers" + "/" + id);
            return observable.toPromise();
        }
        catch (err) {
            alert(err.message);
        }
    }

    public async getOneManufacturer(id: number): Promise<ManufacturerModel> {
        try {
            const observable = await this.httpClient.get<ManufacturerModel>(environment.baseUrl+"/manufacturers" + "/" + id);
            return observable.toPromise();
        }
        catch (err) {
            alert(err.message);
        }
    }

    public async updateManufacturer(manufacturer: ManufacturerModel): Promise<boolean> {
        try {
            const updatedManufacturer = await this.httpClient.put<ManufacturerModel>(environment.baseUrl+"/manufacturers" + "/" + manufacturer.id, manufacturer).toPromise();
            store.dispatch({ type: ActionType.UpdateManufacturer, payload: updatedManufacturer });
            return true;
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
            return false;
        }
    }
}