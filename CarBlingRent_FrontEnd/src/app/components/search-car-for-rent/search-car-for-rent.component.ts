import { NotificationService } from './../../services/notification.service';
import { BranchModel } from './../../../models/branch.model';
import { CarRentalModel } from './../../../models/car-rental.model';
import { ManufacturersService } from './../../services/manufacturers.service';
import { ManufacturerModel } from './../../../models/manufacturer.model';
import { CarFleetModel } from './../../../models/car-fleet.model';
import { CarFleetService } from './../../services/car-fleet.service';
import { CarRentalService } from './../../services/car-rental.service';
import { OrdersService } from './../../services/orders.service';
import { OrderModel } from './../../../models/order.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { store } from 'src/app/redux/store';
import { Unsubscribe } from 'redux';
import { FormControl, Validators } from '@angular/forms';
import { BranchesService } from 'src/app/services/branches.service';

@Component({
    selector: 'app-search-car-for-rent',
    templateUrl: './search-car-for-rent.component.html',
    styleUrls: ['./search-car-for-rent.component.css']
})
export class SearchCarForRentComponent implements OnInit, OnDestroy {

    public order = new OrderModel();
    public carsAvailableForRent: CarRentalModel[] = store.getState().carRental;
    public carsFleet: CarFleetModel[] = store.getState().carFleet;
    public searchResultsCarFleet: CarFleetModel[];
    public searchResultsCarRental: CarRentalModel[];
    public manufacturers: ManufacturerModel[] = store.getState().manufacturers;
    public branches: BranchModel[] = store.getState().branches;
    minDate: Date = new Date(Date.now());
    private unsubscribe: Unsubscribe;
    public textToSearch: string = null
    public textNoSearchResults: string;
    public searchBy: string;
    public foundManfucterId: ManufacturerModel;
    public resultsFound: boolean = true;
    public lastSearch = this.textToSearch;
    serchByControl = new FormControl('', Validators.required);
    public data = JSON.parse(localStorage.getItem('lastCarsUserClick'));
    public lastCarsUserClick = JSON.parse(localStorage.getItem('lastCarsUserClick') || "[]");

    constructor(
        private carRentalService: CarRentalService,  // DI
        private manufacturersService: ManufacturersService,  // DI
        private carFleetService: CarFleetService,
        private brancheService: BranchesService
    ) {  // DI
        this.minDate.setDate(this.minDate.getDate());
    }

    public async ngOnInit() {
        this.unsubscribe = store.subscribe(() => {
            this.carsAvailableForRent = store.getState().carRental;
            this.carsFleet = store.getState().carFleet;
            this.manufacturers = store.getState().manufacturers;
            this.branches = store.getState().branches;
        });

        if (store.getState().carRental.length > 0) {
            this.carsAvailableForRent = store.getState().carRental;
        }
        else {
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
            }
        }
    }

    public saveDataToLocalStorage(manufacturer: string, model: string) {
        let lastChoose = manufacturer + " " + model;
        this.lastCarsUserClick.push(lastChoose);
        localStorage.setItem('lastCarsUserClick', JSON.stringify(this.lastCarsUserClick));
    }

    public startSearch(): void {
        this.textNoSearchResults = this.textToSearch;
        switch (this.searchBy) {
            case "Gear": {
                this.searchResultsCarFleet = this.carsFleet.filter(c => c.gear.toLowerCase().includes(this.textToSearch.toLowerCase()));
                this.searchResultsCarRental = this.carsAvailableForRent.filter(x => this.searchResultsCarFleet.map(y => y.id)
                    .includes(x.carFleetID));
                break;
            }
            case "Year": {
                this.searchResultsCarFleet = this.carsFleet.filter(c => c.yearOfManufacturer.toString() == this.textToSearch);
                this.searchResultsCarRental = this.carsAvailableForRent.filter(x => this.searchResultsCarFleet.map(y => y.id)
                    .includes(x.carFleetID));
                break;
            }
            case "Manufacturer": {
                this.foundManfucterId = this.manufacturers.find(c => c.name.toLowerCase().includes(this.textToSearch.toLowerCase()));
                this.searchResultsCarFleet = this.carsFleet.filter(c => c.manufacturerID == this.foundManfucterId.id);
                this.searchResultsCarRental = this.carsAvailableForRent.
                    filter(x => this.searchResultsCarFleet.map(y => y.id)
                        .includes(x.carFleetID));
                break;
            }
            case "Model": {
                this.searchResultsCarFleet = this.carsFleet.
                    filter(c => c.model.toLowerCase().includes(this.textToSearch.toLowerCase()));
                this.searchResultsCarRental = this.carsAvailableForRent.
                    filter(x => this.searchResultsCarFleet.map(y => y.id)
                        .includes(x.carFleetID));
                break;
            }
            case "Free Text": {
                this.searchResultsCarRental = [];
                this.searchResultsCarFleet = this.carsFleet.filter(c => c.gear.toLowerCase().includes(this.textToSearch.toLowerCase()));
                const arrayOfGears: CarRentalModel[] = this.carsAvailableForRent.filter(x => this.searchResultsCarFleet.map(y => y.id)
                    .includes(x.carFleetID));
                this.searchResultsCarRental = this.searchResultsCarRental.concat(arrayOfGears);
                this.searchResultsCarFleet = this.carsFleet.filter(c => c.yearOfManufacturer.toString() == this.textToSearch);
                const arrayOfYears: CarRentalModel[] = this.carsAvailableForRent.filter(x => this.searchResultsCarFleet.map(y => y.id)
                    .includes(x.carFleetID));
                this.searchResultsCarRental = this.searchResultsCarRental.concat(arrayOfYears);
                this.foundManfucterId = this.manufacturers.find(c => c.name.toLowerCase().includes(this.textToSearch.toLowerCase()));
                this.searchResultsCarFleet = this.carsFleet.filter(c => c.manufacturerID == this.foundManfucterId?.id);
                const arrayOfManufacturers: CarRentalModel[] = this.carsAvailableForRent.
                    filter(x => this.searchResultsCarFleet.map(y => y.id)
                        .includes(x.carFleetID));
                this.searchResultsCarRental = this.searchResultsCarRental.concat(arrayOfManufacturers);
                this.searchResultsCarFleet = this.carsFleet.
                    filter(c => c.model.toLowerCase().includes(this.textToSearch.toLowerCase()));
                const arrayOfModels: CarRentalModel[] = this.carsAvailableForRent.
                    filter(x => this.searchResultsCarFleet.map(y => y.id)
                        .includes(x.carFleetID));
                this.searchResultsCarRental = this.searchResultsCarRental.concat(arrayOfModels);
                this.searchResultsCarRental = this.searchResultsCarRental.filter(function (elem, index, self) {
                    return index === self.indexOf(elem);
                })
                break;
            }
            default:
                console.log("default");
        }

        if (this.searchResultsCarRental.length > 0) {
            this.resultsFound = true;
        }
        else {
            this.resultsFound = false;
        }
    }

    public getManufacturer(carRenalID: any) {
        let manufacturerName: CarFleetModel = new CarFleetModel();
        manufacturerName = this.carsFleet.
            find(c => c.id == carRenalID);
        let manufacturerName2: ManufacturerModel = new ManufacturerModel();
        manufacturerName2 = this.manufacturers.find(c => c.id == manufacturerName.manufacturerID);
        return manufacturerName2?.name;
    }

    public getBranch(branchID: number) {
        let branch: BranchModel = new BranchModel();
        branch = this.branches.find(c => c.id == branchID);
        return branch.name;
    }

    public getModel(carRenalID: number) {
        let manufacturerName: CarFleetModel = new CarFleetModel();
        manufacturerName = this.carsFleet.
            find(c => c.id == carRenalID);
        return manufacturerName.model;
    }

    public getDailyCost(carRenalID: number) {
        return this.carsFleet.find(c => c.id == carRenalID).dailyCost;
    }
    public getYearOfManufacturer(carRenalID: number) {
        return this.carsFleet.find(c => c.id == carRenalID).yearOfManufacturer;
    }
    public getGear(carRenalID: number) {
        return this.carsFleet.find(c => c.id == carRenalID).gear;
    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }
}