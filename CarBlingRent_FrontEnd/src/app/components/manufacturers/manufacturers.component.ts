import { NotificationService } from 'src/app/services/notification.service';
import { store } from './../../redux/store';
import { ManufacturersService } from './../../services/manufacturers.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ManufacturerModel } from 'src/models/manufacturer.model';
import { Unsubscribe } from 'redux';

@Component({
    selector: 'app-manufacturers',
    templateUrl: './manufacturers.component.html',
    styleUrls: ['./manufacturers.component.css']
})
export class ManufacturersComponent implements OnInit, OnDestroy {

    public manufacturers: ManufacturerModel[] = store.getState().manufacturers;
    private unsubscribe: Unsubscribe;
    constructor(private manufacturersService: ManufacturersService,
        private notificationService: NotificationService) { }

    public async ngOnInit() {
        this.unsubscribe = store.subscribe(() => this.manufacturers = store.getState().manufacturers);
        if (store.getState().manufacturers.length == 0) {
            await this.manufacturersService.loadAllManufacturersFromServerAsync();
        }
    }

    public async deleteManufacturer(id: number) {
        try {
            if (confirm('Are you sure you want to delete the manufacturer?')) {
                await this.manufacturersService.deleteManufacturer(id);
                this.notificationService.success("Manufacturer deleted successfully!");
                const index = this.manufacturers.findIndex(p => p.id === id);
                this.manufacturers.splice(index, 1);
            } else {
                return;
            }

        }
        catch (err) {
            alert(err.message);
        }
    }

    public ngOnDestroy(): void {
        this.unsubscribe();
    }
}