
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightService } from './flight-search/flight.service';
import { FlightCardComponent } from './flight-search/flight-card.component';
import { ReactiveFlightSearchComponent } from './reactive-flight-search/reactive-flight-search.component';
import { FlightBookingRouterModule } from './flight-booking.routes';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightBookingComponent } from './flight-booking.component';
import { FlightResolver } from './flight-edit/flight.resolver';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    FlightBookingRouterModule,
    AuthModule
  ],
  declarations: [
    ReactiveFlightSearchComponent,
    FlightSearchComponent,
    FlightCardComponent,
    PassengerSearchComponent,
    FlightEditComponent,
    FlightBookingComponent
  ],
  providers: [
    //FlightService,
    FlightResolver
  ],
  exports: [
    ReactiveFlightSearchComponent,
    FlightSearchComponent
  ]
})
export class FlightBookingModule {

}
