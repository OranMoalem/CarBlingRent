import { CarRentalService } from './../../services/car-rental.service';
import { OrderModel } from './../../../models/order.model';
import { Component, OnInit } from '@angular/core';
import { CarRentalModel } from 'src/models/car-rental.model';
import { Unsubscribe } from 'redux';
import { OrdersService } from 'src/app/services/orders.service';
import { NotificationService } from 'src/app/services/notification.service';
import { store } from 'src/app/redux/store';

@Component({
    selector: 'app-rentals',
    templateUrl: './rentals.component.html',
    styleUrls: ['./rentals.component.css']
})
export class RentalsComponent implements OnInit {
    public loggedUser = JSON.parse(sessionStorage.getItem('user'));
    public orders: OrderModel[] = store.getState().orders;
    public carRentals: CarRentalModel[] = store.getState().carRental;
    public ordersPlacedByLoggedUser: OrderModel[];
    private unsubscribe: Unsubscribe;
    constructor(private ordersService: OrdersService,
        private carRentalService: CarRentalService,
        private notificationService: NotificationService
    ) { }

    public async ngOnInit() {
        this.unsubscribe = store.subscribe(() => {
            this.orders = store.getState().orders;
            this.carRentals = store.getState().carRental;
        });

        if (store.getState().carRental.length > 0) {
            this.carRentals = store.getState().carRental;
        }
        else {

            try {
                await this.carRentalService.loadAllCarRentalAsync();
            }
            catch (err) {
                alert(err.message);
            }
            if (store.getState().orders.length > 0) {
                this.orders = store.getState().orders;
            }
            else {
                try {
                    await this.ordersService.loadAllOrdersFromServerAsync();
                }
                catch (err) {
                    alert(err.message);


                }
            }
        }
        // Find the orders placed by the logged in user
        this.ordersPlacedByLoggedUser = this.orders.filter(c => c.userID == this.loggedUser.id);
        console.log(this.ordersPlacedByLoggedUser)
    }

    public getCarNumber(carID: any) {
        return this.carRentals.find(c => c.id == carID).carNumber;
    }

}
