import { NotificationService } from './../../services/notification.service';
import { BranchesService } from './../../services/branches.service';
import { BranchModel } from './../../../models/branch.model';
import { CarFleetService } from './../../services/car-fleet.service';
import { CarFleetModel } from './../../../models/car-fleet.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarRentalService } from 'src/app/services/car-rental.service';
import { CarRentalModel } from 'src/models/car-rental.model';
import { Unsubscribe } from 'redux';
import { store } from 'src/app/redux/store';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-add-new-car-to-rental',
    templateUrl: './add-new-car-to-rental.component.html',
    styleUrls: ['./add-new-car-to-rental.component.css']
})
export class AddNewCarToRentalComponent implements OnInit, OnDestroy {
    public carRental = new CarRentalModel();
    private unsubscribe: Unsubscribe;
    public preview: string; // User preview image
    public carFleet: CarFleetModel[] = store.getState().carFleet;
    public branches: BranchModel[] = store.getState().branches;

    // Check that this fields has been inserted
    modelControl = new FormControl('', Validators.required);
    isProperForRentControl = new FormControl('', Validators.required);
    isAvailableForRentControl = new FormControl('', Validators.required);
    branchControl = new FormControl('', Validators.required);

    constructor(private branchesService: BranchesService,
        private carFleetService: CarFleetService,
        private carRentalService: CarRentalService,
        private router: Router,
        private notificationService: NotificationService
    ) {
    }

    async ngOnInit() {
        this.unsubscribe = store.subscribe(() => {
            this.carFleet = store.getState().carFleet;
            this.branches = store.getState().branches;
        });

        if (store.getState().carFleet.length > 0) {
            this.carFleet = store.getState().carFleet;
        }
        else {

            try {
                await this.carFleetService.loadAllCarFleetAsync();
            }
            catch (err) {
                alert(err.message);
            }

            if (store.getState().branches.length > 0) {
                this.carFleet = store.getState().branches;
            }
            else {
                try {
                    await this.branchesService.loadAllBranchesFromServerAsync();
                }
                catch (err) {
                    alert(err.message);
                }
            }
        }
    }

    public displayPreview(image: File): void {
        this.carRental.image = image;
        const fileReader = new FileReader();
        fileReader.onload = args => this.preview = args.target.result.toString();
        fileReader.readAsDataURL(image);
    }

    public async addCarToRental() {
        if (!this.preview) {// Must put a picture in the car!
            this.notificationService.error("Please slect an image.");
            return;
        }
        const success = await this.carRentalService.addOneCarToRentalToServer(this.carRental);
        if (success) {
            const success = await this.carRentalService.loadAllCarRentalAsync();
            this.router.navigateByUrl("/carrental");
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }
}