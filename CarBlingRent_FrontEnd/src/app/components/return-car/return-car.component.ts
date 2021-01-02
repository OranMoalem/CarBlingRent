import { CarFleetService } from './../../services/car-fleet.service';
import { CarFleetModel } from './../../../models/car-fleet.model';
import { OrdersService } from './../../services/orders.service';
import { OrderModel } from './../../../models/order.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarRentalModel } from 'src/models/car-rental.model';
import { store } from 'src/app/redux/store';
import { Unsubscribe } from 'redux';
import { CarRentalService } from 'src/app/services/car-rental.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    selector: 'app-return-car',
    templateUrl: './return-car.component.html',
    styleUrls: ['./return-car.component.css']
})
export class ReturnCarComponent implements OnInit, OnDestroy {
    public carRental = new CarRentalModel();
    public allCarRental: CarRentalModel[] = store.getState().carRental;
    public allOrders: OrderModel[] = store.getState().orders;
    public allCarFleet: CarFleetModel[] = store.getState().carFleet;
    public ordersOfTheCar: OrderModel[];
    private unsubscribe: Unsubscribe;
    public carNumber: number;
    public today: Date = new Date();

    constructor(
        private ordersService: OrdersService,
        private carRentalService: CarRentalService,
        private router: Router,
        private notificationService: NotificationService,
        private carFleetService: CarFleetService) { }

    async ngOnInit() {
        this.unsubscribe = store.subscribe(() => {
            this.allCarRental = store.getState().carRental;
            this.allCarFleet = store.getState().carFleet;
            this.allOrders = store.getState().orders;
        });

        if (store.getState().carRental.length > 0) {
            this.allCarRental = store.getState().carRental;
        }
        else {
            try {
                await this.carRentalService.loadAllCarRentalAsync();
            }
            catch (err) {
                alert(err.message);
            }

            if (store.getState().orders.length > 0) {
                this.allOrders = store.getState().orders;
            }
            else {
                try {
                    await this.ordersService.loadAllOrdersFromServerAsync();
                }
                catch (err) {
                    alert(err.message);
                }

                if (store.getState().carFleet.length > 0) {
                    this.allCarFleet = store.getState().carFleet;
                }
                else {
                    try {
                        await this.carFleetService.loadAllCarFleetAsync();
                    }
                    catch (err) {
                        alert(err.message);
                    }
                }
            }
        }
    }

    public async findCarOrders() {
        //Finding the orders of the vehicle number
        let carID = this.allCarRental.find(c => c.carNumber == this.carRental.carNumber );

        if (carID == undefined) {
            this.notificationService.error("The car number you entered is not existed in the system !")
            return;
        }
        //Filter orders that have already returned to the system
        this.ordersOfTheCar = this.allOrders.filter(o => o.carID == carID.id)
            .filter(o => o.actualReturnDate == null);
    }

    public async returnCar(orderID: number) {
        const orderToUpdate: OrderModel = await this.allOrders.find(c => c.id == orderID);
        const carToReutrn: CarRentalModel = await this.allCarRental.find(c => c.id == orderToUpdate.carID);

        orderToUpdate.actualReturnDate = new Date(); //The date of return of the vehicle is today
        carToReutrn.isAvailableForRent = true; // The vehicle is available for rent

        await this.ordersService.updateOrder(orderToUpdate);
        await this.carRentalService.updateCarRental(carToReutrn, false);
        this.notificationService.success("Car number : " + carToReutrn.carNumber + " was returned to the cars available for rent!");
        this.router.navigateByUrl("/home");
    }

    public getPriceRental(orderID: OrderModel) {
        let order: OrderModel = this.allOrders.find(o => o.id == orderID);
        let carRentelToFind: CarRentalModel = this.allCarRental.find(c => c.id == order.carID);
        let car: CarFleetModel = this.allCarFleet.find(c => c.id == carRentelToFind.carFleetID);
        let startDate = new Date(Date.parse(order.startDate.toString()));
        let returnDate = new Date(Date.parse(order.returnDate.toString()));
        let today = new Date(Date.parse(this.today.toString()));
        let fullRentalPeriod = this.getNumberOfDaysBetweenTwoDates(Math.abs(returnDate.getTime() - startDate.getTime()));
        let rentalPeriodEndingToday = this.getNumberOfDaysBetweenTwoDates(Math.abs(today.getTime() - startDate.getTime()));
        let lateRentalPeriod = this.getNumberOfDaysBetweenTwoDates(Math.abs(today.getTime() - returnDate.getTime()));

        if (this.isLateReturningCar(orderID)) {
            return ((fullRentalPeriod) * car.dailyCost) + ((lateRentalPeriod - 1) * car.lateDayCost);
        }

        return rentalPeriodEndingToday * car.dailyCost;
    }

    public getNumberOfDaysBetweenTwoDates(twoDatesValues): number {
        return (Math.ceil(twoDatesValues / (1000 * 3600 * 24)));;
    }

    public getNumberOfRentalDays(orderID: OrderModel): number {
        let order: OrderModel = this.allOrders.find(o => o.id == orderID);
        let startDate = new Date(Date.parse(order.startDate.toString()));
        let today = new Date(Date.parse(this.today.toString()));
        let diff = Math.abs(today.getTime() - startDate.getTime());
        let numberOfRentalDays = Math.ceil(diff / (1000 * 3600 * 24));
        return numberOfRentalDays;
    }

    public getNumberOfFullRentalDays(orderID: OrderModel): number {
        let order: OrderModel = this.allOrders.find(o => o.id == orderID);
        let startDate = new Date(Date.parse(order.startDate.toString()));
        let returnDate = new Date(Date.parse(order.returnDate.toString()));
        let diff = Math.abs(returnDate.getTime() - startDate.getTime());
        let numberOfFullRentalDays = Math.ceil(diff / (1000 * 3600 * 24));
        return numberOfFullRentalDays - 1;
    }

    public getNumberOfLateDays(orderID: OrderModel): number {
        let order: OrderModel = this.allOrders.find(o => o.id == orderID);
        let today = new Date(Date.parse(this.today.toString()));
        let returnDate = new Date(Date.parse(order.returnDate.toString()));
        let diff = Math.abs(returnDate.getTime() - today.getTime());
        let numberOfLateDays = Math.ceil(diff / (1000 * 3600 * 24));
        return numberOfLateDays - 1;
    }

    public isLateReturningCar(orderID: OrderModel): boolean {
        let order: OrderModel = this.allOrders.find(o => o.id == orderID);
        let returnDate = new Date(Date.parse(order.returnDate.toString()));
        let actualReturnDate = new Date(Date.parse(this.today.toString()));
        return actualReturnDate > returnDate;
    }

    public ngOnDestroy(): void {
        this.unsubscribe();
    }
}
