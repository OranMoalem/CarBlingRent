import { CarFleetService } from './../../services/car-fleet.service';
import { CarFleetModel } from './../../../models/car-fleet.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { ManufacturerModel } from 'src/models/manufacturer.model';
import { store } from 'src/app/redux/store';
import { ManufacturersService } from 'src/app/services/manufacturers.service';
import { Unsubscribe } from 'redux';

@Component({
    selector: 'app-update-car-fleet',
    templateUrl: './update-car-fleet.component.html',
    styleUrls: ['./update-car-fleet.component.css']
})
export class UpdateCarFleetComponent implements OnInit {
    public carFleet: CarFleetModel;
    manufacturerControl = new FormControl('', Validators.required);
    gearControl = new FormControl('', Validators.required);
    public date: Date = new Date();
    private unsubscribe: Unsubscribe;
    public manufacturers: ManufacturerModel[];
    constructor(private router: Router, private carFleetService: CarFleetService, private activatedRoute: ActivatedRoute,
        private manufacturersService: ManufacturersService) { }

    async ngOnInit() {
        try {
            const id = +this.activatedRoute.snapshot.params.carFleetID;
            this.carFleet = new CarFleetModel();
            this.carFleet = await this.carFleetService.getOneCarFromFleet(id);
        }
        catch (err) {
            alert(err.message);
        }
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

    public async updateCarFleet() {
        try {
            const updatedCarFleet = await this.carFleetService.updateCarFleet(this.carFleet);

            this.router.navigateByUrl("/carfleet");
        }
        catch (err) {
            alert(err.message);
        }
    }
    ngOnDestroy(): void {
        this.unsubscribe();
    }
}