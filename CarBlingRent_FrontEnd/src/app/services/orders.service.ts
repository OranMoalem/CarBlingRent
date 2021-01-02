import { environment } from 'src/environments/environment';
import { store } from './../redux/store';
import { OrderModel } from './../../models/order.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActionType } from '../redux/action-type';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {

    constructor(private httpClient: HttpClient) { }

    public async loadAllOrdersFromServerAsync(): Promise<boolean> {
        try {
            const orders = await this.httpClient.get<OrderModel[]>(environment.baseUrl+"/orders").toPromise();
            store.dispatch({ type: ActionType.GetAllOrders, payload: orders });
            return true;
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
            return false;
        }
    }

    public async addOrder(order: OrderModel): Promise<boolean> {
        try {
            const addedOrder = await this.httpClient.post<OrderModel>(environment.baseUrl+"/orders/new", order).toPromise();
            store.dispatch({ type: ActionType.AddOrder, payload: addedOrder });
            return true;
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
            return false;
        }
    }

    public async deleteOrder(id: number): Promise<undefined> {
        try {
            const observable = this.httpClient.delete<undefined>(environment.baseUrl+"/orders" + "/" + id);
            return observable.toPromise();
        }
        catch (err) {
            alert(err.message)
        }
    }

    public async getOneOrder(id: number): Promise<OrderModel> {
        try {
            const observable = this.httpClient.get<OrderModel>(environment.baseUrl+"/orders" + "/" + id);
            return observable.toPromise();
        }
        catch (err) {
            alert(err.message)
        }
    }

    public async updateOrder(order: OrderModel): Promise<boolean> {
        try {
            const updatedOrder = await this.httpClient.patch<OrderModel>(environment.baseUrl+"/orders" + "/" + order.id, order).toPromise();
            store.dispatch({ type: ActionType.UpdateOrder, payload: updatedOrder });
            return true;
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
            return false;
        }
    }
}