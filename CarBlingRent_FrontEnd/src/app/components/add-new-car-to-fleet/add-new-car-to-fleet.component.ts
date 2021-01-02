import { CarFleetService } from './../../services/car-fleet.service';
import { CarFleetModel } from './../../../models/car-fleet.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { store } from 'src/app/redux/store';
import { ManufacturerModel } from 'src/models/manufacturer.model';
import { Unsubscribe } from 'redux';
import { ManufacturersService } from 'src/app/services/manufacturers.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-add-new-car-to-fleet',
    templateUrl: './add-new-car-to-fleet.component.html',
    styleUrls: ['./add-new-car-to-fleet.component.css']
})
export class AddNewCarToFleetComponent implements OnInit, OnDestroy {
    public manufacturers: ManufacturerModel[];
    public date: Date;
    public carFleet = new CarFleetModel();
    private unsubscribe: Unsubscribe;
    // Check that this fields has been inserted
    manufacturerControl = new FormControl('', Validators.required);
    gearControl = new FormControl('', Validators.required);
    
    constructor(private carFleetService: CarFleetService,
        private router: Router,
        private manufacturersService: ManufacturersService) { } // DI
    async ngOnInit() {
        this.date = new Date();

        this.unsubscribe = store.subscribe(() => {
            this.manufacturers = store.getState().manufacturers;
        });

        if (store.getState().manufacturers.length > 0) {
            this.manufacturers = store.getState().manufacturers;
        }
        else {

            try {
                await this.manufacturersService.loadAllManufacturersFromServerAsync();
            }
            catch (err) {
                alert(err.message);
            }
        }

    }
    public async addCarToFleet() {
        // If user didn't bring all products yet - get them first:
        if (store.getState().carFleet.length == 0) {
            const success = await this.carFleetService.loadAllCarFleetAsync();
            if (!success)
                return;
        }

        const success = await this.carFleetService.addOneCarToFleetToServer(this.carFleet);
        if (success) {
            this.router.navigateByUrl("/carfleet");
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }
}