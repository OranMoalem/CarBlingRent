import { OrdersService } from './../../services/orders.service';
import { OrderModel } from './../../../models/order.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { store } from 'src/app/redux/store';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

    public orders: OrderModel[] = store.getState().orders;
    private unsubscribe: Unsubscribe;
    constructor(private ordersService: OrdersService,
        private notificationService: NotificationService) { }

    public async ngOnInit() {
        this.unsubscribe = store.subscribe(() => this.orders = store.getState().orders);
        if (store.getState().orders.length == 0) {
            await this.ordersService.loadAllOrdersFromServerAsync();
        }
    }

    public async deleteOrder(id: number) {
        try {
            if (confirm('Are you sure you want to delete the order?')) {
                await this.ordersService.deleteOrder(id);
                this.notificationService.success("The order was successfully deleted!")
                const index = this.orders.findIndex(p => p.id === id);
                this.orders.splice(index, 1);
            }
        }
        catch (err) {
            alert(err.message);
        }
    }

    public ngOnDestroy(): void {
        this.unsubscribe();
    }

}