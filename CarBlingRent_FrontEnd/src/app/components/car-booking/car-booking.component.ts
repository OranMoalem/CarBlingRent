import { BranchesService } from './../../services/branches.service';
import { CarFleetService } from './../../services/car-fleet.service';
import { ManufacturersService } from './../../services/manufacturers.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Unsubscribe } from 'redux';
import { store } from 'src/app/redux/store';
import { CarRentalService } from 'src/app/services/car-rental.service';
import { BranchModel } from 'src/models/branch.model';
import { CarFleetModel } from 'src/models/car-fleet.model';
import { CarRentalModel } from 'src/models/car-rental.model';
import { ManufacturerModel } from 'src/models/manufacturer.model';

@Component({
  selector: 'app-car-booking',
  templateUrl: './car-booking.component.html',
  styleUrls: ['./car-booking.component.css']
})
export class CarBookingComponent implements OnInit,OnDestroy {
    public carsAvailableForRent : CarRentalModel[] = store.getState().carRental;
    public carsFleet : CarFleetModel[] = store.getState().carFleet;
    public manufacturers : ManufacturerModel[] = store.getState().manufacturers;
    public branches : BranchModel[] = store.getState().branches;
    private unsubscribe : Unsubscribe;
    public searchResultsCarRental : CarRentalModel[];

  constructor(private carRentalService: CarRentalService,// DI
    private manufacturersService: ManufacturersService,
    private carFleetService: CarFleetService,
    private brancheService: BranchesService) { }

    public async ngOnInit() {
        this.unsubscribe = store.subscribe (() => {
            this.carsAvailableForRent = store.getState().carRental;
            this.carsFleet = store.getState().carFleet;
            this.manufacturers = store.getState().manufacturers;
            this.branches = store.getState().branches;
        });

                try {
                    await this.carRentalService.loadAllCarRentalAsync();
                }
                catch (err) {
                    alert(err.message);
        }

        if (store.getState().carFleet.length > 0) {
            this.carsFleet = store.getState().carFleet;
        }
        else {
                try {
                    await this.carFleetService.loadAllCarFleetAsync();
                }
                catch (err) {
                    alert(err.message);
        }
        }

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

        if (store.getState().branches.length > 0) {
            this.branches = store.getState().branches;
        }
        else {
                try {
                    await this.brancheService.loadAllBranchesFromServerAsync();
                    
                }
                catch (err) {
                    alert(err.message);
        }
      } 

        this.searchResultsCarRental = this.carsAvailableForRent.filter(x => this.carsFleet.map(y => y.id)
        .includes(x.carFleetID));
    }

    public getManufacturer(carRenalID :any) {
        let manufacturerName : CarFleetModel = new CarFleetModel();
        manufacturerName = this.carsFleet.
        find(c=>c.id == carRenalID);
        let manufacturerName2 :ManufacturerModel = new ManufacturerModel();
        manufacturerName2 = this.manufacturers.find(c=>c.id==manufacturerName.manufacturerID);
           return manufacturerName2.name;
       }
       
       public getBranch(branchID :any) {
        let branch : BranchModel = new BranchModel();
        branch=this.branches.find(c=>c.id==branchID);
           return branch.name;
       }

       public getModel(carRenalID :any) {
        let manufacturerName : CarFleetModel = new CarFleetModel();
        manufacturerName = this.carsFleet.
        find(c=>c.id == carRenalID);
           return manufacturerName.model;
       }

       public getDailyCost(carRenalID :any) {
        return this.carsFleet.find(c=>c.id == carRenalID).dailyCost;
       }
       public getYearOfManufacturer(carRenalID :any) {
        return this.carsFleet.find(c=>c.id == carRenalID).yearOfManufacturer;
       }
       public getGear(carRenalID :any) {
        return this.carsFleet.find(c=>c.id == carRenalID).gear;
       }

     ngOnDestroy(): void {
        this.unsubscribe();
        
    }

}
