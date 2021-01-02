import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { ManufacturersComponent } from './components/manufacturers/manufacturers.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AboutComponent } from './components/about/about.component';
import { AddNewManufacturerComponent } from './components/add-new-manufacturer/add-new-manufacturer.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import {MatFormFieldModule} from '@angular/material/form-field';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { BranchesComponent } from './components/branches/branches.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import { UpdateManufacturerComponent } from './components/update-manufacturer/update-manufacturer.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { CarFleetComponent } from './components/car-fleet/car-fleet.component';
import { UpdateCarFleetComponent } from './components/update-car-fleet/update-car-fleet.component';
import { AddNewCarToFleetComponent } from './components/add-new-car-to-fleet/add-new-car-to-fleet.component';
import { AddNewCarToRentalComponent } from './components/add-new-car-to-rental/add-new-car-to-rental.component';
import { UpdateCarRentalComponent } from './components/update-car-rental/update-car-rental.component';
import { CarRentalComponent } from './components/car-rental/car-rental.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddNewOrderComponent } from './components/add-new-order/add-new-order.component';
import { UpdateOrderComponent } from './components/update-order/update-order.component';
import { SearchCarForRentComponent } from './components/search-car-for-rent/search-car-for-rent.component';
import { ReturnCarComponent } from './components/return-car/return-car.component';
import { CarBookingComponent } from './components/car-booking/car-booking.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

@NgModule({
  declarations: [
    
  ManufacturersComponent,
    
  MenuComponent,
    
  HomeComponent,
    
  LayoutComponent,
    
  AboutComponent,
    
  AddNewManufacturerComponent,
    
  RegisterComponent,
    
  UsersComponent,
    
  BranchesComponent,
    
    
  LoginComponent,
    
  LogoutComponent,
    
    
  UpdateManufacturerComponent,
    
    
  UpdateUserComponent,
    
    
  CarFleetComponent,
    
    
  UpdateCarFleetComponent,
    
    
  AddNewCarToFleetComponent,
    
    
  AddNewCarToRentalComponent,
    
    
  UpdateCarRentalComponent,
    
    
  CarRentalComponent,
    
    
  OrdersComponent,
    
    
  AddNewOrderComponent,
    
    
  UpdateOrderComponent,
    
    
  SearchCarForRentComponent,
    
    
  ReturnCarComponent,
    
    
  CarBookingComponent,
    
    
  RentalsComponent,
    
    
  FooterComponent,
    
    
  ContactUsComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
   BrowserAnimationsModule,
   MatInputModule,
   MatButtonModule,
   MatCheckboxModule,
   MatFormFieldModule,
   MatNativeDateModule,
   MatMomentDateModule,
   MatIconModule,
   ReactiveFormsModule,


   A11yModule,
   ClipboardModule,
   CdkStepperModule,
   CdkTableModule,
   CdkTreeModule,
   DragDropModule,
   MatAutocompleteModule,
   MatBadgeModule,
   MatBottomSheetModule,
   MatButtonModule,
   MatButtonToggleModule,
   MatCardModule,
   MatCheckboxModule,
   MatChipsModule,
   MatStepperModule,
   MatDatepickerModule,
   MatDialogModule,
   MatDividerModule,
   MatExpansionModule,
   MatGridListModule,
   MatIconModule,
   MatInputModule,
   MatListModule,
   MatMenuModule,
   MatNativeDateModule,
   MatPaginatorModule,
   MatProgressBarModule,
   MatProgressSpinnerModule,
   MatRadioModule,
   MatSelectModule,
   MatSidenavModule,
   MatSliderModule,
   MatSlideToggleModule,
   MatSnackBarModule,
   MatSortModule,
   MatTableModule,
   MatTabsModule,
   MatToolbarModule,
   MatTooltipModule,
   MatTreeModule,
   OverlayModule,
   PortalModule,
   ScrollingModule,
   BrowserModule,
   MatDatepickerModule, MatMomentDateModule
   
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass:JwtInterceptorService,
      multi:true,
      
  },
  { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
