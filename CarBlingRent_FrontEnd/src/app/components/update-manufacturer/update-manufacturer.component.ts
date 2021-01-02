import { Router } from '@angular/router';
import { ManufacturersService } from './../../services/manufacturers.service';
import { ManufacturerModel } from 'src/models/manufacturer.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-update-manufacturer',
    templateUrl: './update-manufacturer.component.html',
    styleUrls: ['./update-manufacturer.component.css']
})
export class UpdateManufacturerComponent implements OnInit {
    public manufacturer: ManufacturerModel;
    constructor(private router: Router, private manufacturerService: ManufacturersService, private activatedRoute: ActivatedRoute) { }

    async ngOnInit() {
        try {
            const id = +this.activatedRoute.snapshot.params.manufID;
            this.manufacturer = new ManufacturerModel();
            this.manufacturer = await this.manufacturerService.getOneManufacturer(id);
        }
        catch (err) {
            alert(err.message);
        }
    }

    public async updateManufacturer() {
        try {
            const updatedManufacturer = await this.manufacturerService.updateManufacturer(this.manufacturer);
            this.router.navigateByUrl("/manufacturers");
        }
        catch (err) {
            alert(err.message);
        }
    }
}