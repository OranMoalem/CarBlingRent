import { CarFleetService } from './../../services/car-fleet.service';
import { Unsubscribe } from 'redux';
import { CarFleetModel } from './../../../models/car-fleet.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { store } from '../../redux/store';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    selector: 'app-car-fleet',
    templateUrl: './car-fleet.component.html',
    styleUrls: ['./car-fleet.component.css']
})
export class CarFleetComponent implements OnInit, OnDestroy {

    public carFleet: CarFleetModel[] = store.getState().carFleet;
    private unsubscribe: Unsubscribe;
    constructor(private carFleetService: CarFleetService,
        private notificationService: NotificationService) { }

    public async ngOnInit() {
        this.unsubscribe = store.subscribe(() => this.carFleet = store.getState().carFleet);
        if (store.getState().carFleet.length == 0) {
            await this.carFleetService.loadAllCarFleetAsync();
        }
    }

    public ngOnDestroy(): void {
        this.unsubscribe();
    }

    public async deleteCarFleet(id: number) {
        try {
            if (confirm('Are you sure you want to delete the car from the cars fleet?')) {
                await this.carFleetService.deleteCarFromFleet(id);
                this.notificationService.success("The car was successfully deleted from the cars fleet!")
                const index = this.carFleet.findIndex(p => p.id === id);
                this.carFleet.splice(index, 1);
            }
        }
        catch (err) {
            alert(err.message);
        }
    }
}

