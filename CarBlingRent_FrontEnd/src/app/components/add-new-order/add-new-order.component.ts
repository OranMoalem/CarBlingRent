import { CarFleetService } from './../../services/car-fleet.service';
import { CarFleetModel } from './../../../models/car-fleet.model';
import { CarRentalService } from './../../services/car-rental.service';
import { OrdersService } from './../../services/orders.service';
import { UserModel } from './../../../models/user.model';
import { OrderModel } from './../../../models/order.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { store } from 'src/app/redux/store';
import { CarRentalModel } from 'src/models/car-rental.model';
import { NotificationService } from 'src/app/services/notification.service';
import { Unsubscribe } from 'redux';

@Component({
    selector: 'app-add-new-order',
    templateUrl: './add-new-order.component.html',
    styleUrls: ['./add-new-order.component.css']
})
export class AddNewOrderComponent implements OnInit, OnDestroy {
    public order: OrderModel = new OrderModel();
    public orders: OrderModel[] = store.getState().orders;
    private unsubscribe: Unsubscribe;
    public carRental: CarRentalModel;
    public carFleet: CarFleetModel;
    public orders2: OrderModel[];
    minDate: Date = new Date(Date.now()); // Orders are possible starting today

    // Last cars the user is interested in
    public data = JSON.parse(localStorage.getItem('lastCarsUserClick'));

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private ordersService: OrdersService,
        private carRentalService: CarRentalService,
        private carFleetService: CarFleetService,
        private notificationService: NotificationService
    ) { }

    public async ngOnInit() {
        this.unsubscribe = store.subscribe(() => this.orders = store.getState().orders);
        if (store.getState().orders.length == 0) {
            await this.ordersService.loadAllOrdersFromServerAsync();
        }
        try {
            const id = +this.activatedRoute.snapshot.params.carID;
            this.order = new OrderModel();
            this.order.carID = id; // The car selected by the user / guest
            this.carRental = new CarRentalModel();
            this.carRental = await this.carRentalService.getOneCarFromRental(id);
            this.carFleet = new CarFleetModel();
            this.carFleet = await this.carFleetService.getOneCarFromFleet(this.carRental.carFleetID);
            this.orders = this.orders.filter(c => c.carID == id);
            console.log(this.orders);
        }
        catch (err) {
            alert(err.message);
        }
    }

    public getPriceRental(price: number) {
        let startDate = new Date(Date.parse(this.order.startDate.toString()));
        let returnDate = new Date(Date.parse(this.order.returnDate.toString()));
        let diff = Math.abs(returnDate.getTime() - startDate.getTime());
        let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        return (diffDays) * price;
    }

    public async addOrder() {
        if (store.getState().orders.length == 0) {
            const success = await this.ordersService.loadAllOrdersFromServerAsync();
            if (!success)
                return;
        }
        // Only a logged in user can order the car
        if (JSON.parse(sessionStorage.getItem('user')) == null) {
            this.notificationService.error("To rent a car, please log in");
            return;
        }

        // Check if the car is available for rent on the selected dates
        for (let i = 0; i < this.orders.length; i++) {

            let orderStartDate = new Date().setHours(0, 0, 0, 0);
            orderStartDate = (Date.parse(this.order.startDate.toString()));

            let orderReturnDate = new Date().setHours(0, 0, 0, 0);
            orderReturnDate = (Date.parse(this.order.returnDate.toString()));

            let startDate = new Date().setHours(0, 0, 0, 0);
            startDate = (Date.parse(this.orders[i].startDate.toString()));

            let returnDate = new Date().setHours(0, 0, 0, 0);
            returnDate = (Date.parse(this.orders[i].returnDate.toString()));

            if (orderStartDate == startDate || orderReturnDate == returnDate ||
                returnDate == orderStartDate || startDate == orderReturnDate) {
                this.notificationService.error("The requested car is rented on these dates, please select other dates!");
                return;
            }

            else if (startDate >= orderStartDate && returnDate >= orderReturnDate &&
                orderStartDate <= returnDate && orderReturnDate >= startDate) {
                this.notificationService.error("The requested car is rented on these dates, please select other dates!");
                return;
            }

            else if (startDate >= orderStartDate && orderReturnDate >= returnDate
                && startDate <= orderReturnDate && orderReturnDate >= startDate) {
                this.notificationService.error("The requested car is rented on these dates, please select other dates!");
                return;
            }

            else if (orderStartDate >= startDate && orderReturnDate <= returnDate
                && startDate <= orderReturnDate && orderReturnDate >= startDate) {
                this.notificationService.error("The requested car is rented on these dates, please select other dates!");
                return;
            }

            else if (startDate <= orderStartDate && returnDate <= orderReturnDate
                && startDate <= orderReturnDate && orderStartDate <= returnDate) {
                this.notificationService.error("The requested car is rented on these dates, please select other dates!");
                return;
            }

            else if (orderStartDate > startDate && orderReturnDate > returnDate) {
                continue;
            }
        }

        let user: UserModel = JSON.parse(sessionStorage.getItem('user'));
        this.order.userID = user.id; // Setting up the user logged in to the invitation
        this.carRental.isAvailableForRent = false; //Setting the booked car as "not available for rent"

        this.carRental.isAvailableForRent = false;
        this.carRentalService.updateCarRental(this.carRental, false); //Car update

        // Add the user's invitation to the order list
        const success = await this.ordersService.addOrder(this.order);
        if (success) {
            this.router.navigateByUrl("/home");
        }
    }

    public ngOnDestroy(): void {
        this.unsubscribe();
    }

    format(date: Date, displayFormat: Object): string {
        if (displayFormat == "input") {
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            return this._to2digit(day) + '/' + this._to2digit(month) + '/' + year;
        } else {
            return date.toDateString();
        }
    }

    private _to2digit(n: number) {
        return ('00' + n).slice(-2);
    }

    get local(): any {
        return localStorage.getItem('lastCarsUserClick');
    }
}