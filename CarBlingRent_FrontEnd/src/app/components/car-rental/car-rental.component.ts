import { CarRentalService } from 'src/app/services/car-rental.service';
import { CarRentalModel } from './../../../models/car-rental.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { store } from 'src/app/redux/store';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrls: ['./car-rental.component.css']
})
export class CarRentalComponent implements OnInit,OnDestroy {
    public carRental : CarRentalModel[] = store.getState().carRental;
    private unsubscribe : Unsubscribe;
  constructor(private carRentalService : CarRentalService,
    private notificationService :NotificationService) { }

  async ngOnInit() {

    this.unsubscribe = store.subscribe (() => {
        this.carRental = store.getState().carRental;
    });

        
            try {
                await this.carRentalService.loadAllCarRentalAsync();
            }
            catch (err) {
                alert(err.message);
    }
  }

  public async deleteCarFromRental(id :number)  {
    try{
        if (confirm('Are you sure you want to delete the car from the cars available for rent?')) {
    await this.carRentalService.deleteCarFromRental(id);
    this.notificationService.success("The car was successfully deleted from the cars available for rent!");
    const index = this.carRental.findIndex(p => p.id === id);
    this.carRental.splice(index, 1);
        }
     else {
        return;
      }
}
        catch (err) {
            alert(err.message);
    }
}
  ngOnDestroy(): void {
    this.unsubscribe();
}
}


