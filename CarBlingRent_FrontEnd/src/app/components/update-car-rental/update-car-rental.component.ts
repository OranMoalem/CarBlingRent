import { CarRentalService } from './../../services/car-rental.service';
import { NotificationService } from './../../services/notification.service';
import { BranchesService } from './../../services/branches.service';
import { BranchModel } from './../../../models/branch.model';
import { CarFleetService } from './../../services/car-fleet.service';
import { CarFleetModel } from './../../../models/car-fleet.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarRentalModel } from 'src/models/car-rental.model';
import { Unsubscribe } from 'redux';
import { store } from 'src/app/redux/store';
import { FormControl, Validators } from '@angular/forms';
@Component({
    selector: 'app-update-car-rental',
    templateUrl: './update-car-rental.component.html',
    styleUrls: ['./update-car-rental.component.css']
})
export class UpdateCarRentalComponent implements OnInit, OnDestroy {
    public carRental: CarRentalModel;
    private unsubscribe: Unsubscribe;
    public preview: string;
    public carFleet: CarFleetModel[] = store.getState().carFleet;
    public branches: BranchModel[] = store.getState().branches;
    modelControl = new FormControl('', Validators.required);
    isProperForRentControl = new FormControl('', Validators.required);
    isAvailableForRentControl = new FormControl('', Validators.required);
    branchControl = new FormControl('', Validators.required);
    constructor(private carRentalService: CarRentalService,
        private activatedRoute: ActivatedRoute,
        private carFleetService: CarFleetService,
        private router: Router,
        private branchesService: BranchesService,) { }

    public async ngOnInit() {
        this.unsubscribe = store.subscribe(() => {
            this.carFleet = store.getState().carFleet;
            this.branches = store.getState().branches;
        });

        if (store.getState().carFleet.length == 0) {
            await this.carFleetService.loadAllCarFleetAsync();
        }
        if (store.getState().branches.length == 0) {
            await this.branchesService.loadAllBranchesFromServerAsync();
        }
        try {
            const id = +this.activatedRoute.snapshot.params.carRentalID;
            this.carRental = new CarRentalModel();
            this.carRental = await this.carRentalService.getOneCarFromRental(id);

        }
        catch (err) {
            alert(err.message);
        }
    }

    public displayPreview(image: File): void {
        this.carRental.image = image;
        const fileReader = new FileReader();
        fileReader.onload = args => this.preview = args.target.result.toString();
        fileReader.readAsDataURL(image);
    }

    public async UpdateCarRental() {
        try {
            const updatedCarRental = await this.carRentalService.updateCarRental(this.carRental, this.carRental.image != null)

            this.router.navigateByUrl("/carrental");
        }
        catch (err) {
            alert(err.message);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }
}