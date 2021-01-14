import { ManufacturersService } from './../../services/manufacturers.service';
import { Component } from '@angular/core';
import { ManufacturerModel } from 'src/models/manufacturer.model';
import { Router } from '@angular/router';
import { store } from 'src/app/redux/store';

@Component({
    selector: 'app-add-new-manufacturer',
    templateUrl: './add-new-manufacturer.component.html',
    styleUrls: ['./add-new-manufacturer.component.css']
})
export class AddNewManufacturerComponent {
    public manufacturer = new ManufacturerModel();

    constructor(private manufacturerService: ManufacturersService,
        private router: Router) { } // DI

    public async addManufacturer() {
        if (store.getState().manufacturers.length == 0) {
            const success = await this.manufacturerService.loadAllManufacturersFromServerAsync();
            if (!success)
                return;
        }
        const success = await this.manufacturerService.addManufacturerToServer(this.manufacturer);
        if (success) {
            this.router.navigateByUrl("/manufacturers");
        }
    }
}