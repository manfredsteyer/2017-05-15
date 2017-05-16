
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightService } from './flight-search/flight.service';
import { FlightCardComponent } from './flight-search/flight-card.component';
import { ReactiveFlightSearchComponent } from './reactive-flight-search/reactive-flight-search.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    ReactiveFlightSearchComponent,
    FlightSearchComponent,
    FlightCardComponent
  ],
  providers: [
    // FlightService
  ],
  exports: [
    ReactiveFlightSearchComponent,
    FlightSearchComponent
  ]
})
export class FlightBookingModule {

}
