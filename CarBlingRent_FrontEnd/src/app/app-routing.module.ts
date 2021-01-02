import { WorkerGuard } from './services/worker.guard';
import { UpdateOrderComponent } from './components/update-order/update-order.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { CarBookingComponent } from './components/car-booking/car-booking.component';
import { CanActivate } from '@angular/router';
import { ReturnCarComponent } from './components/return-car/return-car.component';
import { SearchCarForRentComponent } from './components/search-car-for-rent/search-car-for-rent.component';
import { UpdateCarRentalComponent } from './components/update-car-rental/update-car-rental.component';
import { AddNewOrderComponent } from './components/add-new-order/add-new-order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddNewCarToRentalComponent } from './components/add-new-car-to-rental/add-new-car-to-rental.component';
import { AddNewCarToFleetComponent } from './components/add-new-car-to-fleet/add-new-car-to-fleet.component';
import { UpdateCarFleetComponent } from './components/update-car-fleet/update-car-fleet.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UpdateManufacturerComponent } from './components/update-manufacturer/update-manufacturer.component';
import { AdminGuard } from './services/admin.guard';
import { LoginGuardService } from './services/login-guard.service';
import { LogoutComponent } from './components/logout/logout.component';
import { LoginComponent } from './components/login/login.component';
import { BranchesComponent } from './components/branches/branches.component';
import { UsersComponent } from './components/users/users.component';
import { RegisterComponent } from './components/register/register.component';
import { AddNewManufacturerComponent } from './components/add-new-manufacturer/add-new-manufacturer.component';
import { AboutComponent } from './components/about/about.component';
import { ManufacturersComponent } from './components/manufacturers/manufacturers.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarFleetComponent } from './components/car-fleet/car-fleet.component';
import { CarRentalComponent } from './components/car-rental/car-rental.component';

const routes: Routes = [
    //Gust
    { path: "home", component: HomeComponent },
    { path: "about", component: AboutComponent },
    { path: "auth/register", component: RegisterComponent },
    { path: "login", component: LoginComponent },

    //Admin
    { path: "orders/:orderID",canActivate:[AdminGuard], component: UpdateOrderComponent },
    { path: "users",canActivate:[AdminGuard], component: UsersComponent },
    { path: "manufacturers",canActivate:[AdminGuard], component: ManufacturersComponent },
    { path: "branches",canActivate:[AdminGuard], component: BranchesComponent },
    { path: "orders",canActivate:[AdminGuard], component: OrdersComponent },
    { path: "carfleet",canActivate:[AdminGuard], component: CarFleetComponent },
    { path: "carrental",canActivate:[AdminGuard], component: CarRentalComponent },
    { path: "manufacturers/new",canActivate:[AdminGuard], component: AddNewManufacturerComponent },
    { path: "carfleet/new",canActivate:[AdminGuard], component: AddNewCarToFleetComponent },
    { path: "carrental/new",canActivate:[AdminGuard], component: AddNewCarToRentalComponent },
    { path: "manufacturers/:manufID",canActivate:[AdminGuard], component: UpdateManufacturerComponent },
    {path: "auth/update/:useID",canActivate:[AdminGuard], component: UpdateUserComponent },
    { path: "carfleet/:carFleetID",canActivate:[AdminGuard], component: UpdateCarFleetComponent },
    { path: "carrental/:carRentalID",canActivate:[AdminGuard], component: UpdateCarRentalComponent },
   
    
    //User
    { path: "logout", component: LogoutComponent },
    { path: "orders/new/:carID", component: AddNewOrderComponent },
    { path: "book-car",canActivate:[LoginGuardService], component: CarBookingComponent },
    { path: "rentals",canActivate:[LoginGuardService], component: RentalsComponent },
   
    //Worker
    { path: "return-car",canActivate:[WorkerGuard], component: ReturnCarComponent },
    
    { path: "search-car", component: SearchCarForRentComponent },
    
   
    
    { path: "", redirectTo: "/home", pathMatch: "full" }, // pathMath - exact empty string.
    { path: "**", component: HomeComponent } // Must be the last route!!
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { 
    
}