import { Routes, RouterModule } from '@angular/router';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { ReactiveFlightSearchComponent } from './reactive-flight-search/reactive-flight-search.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightBookingComponent } from './flight-booking.component';
import { AuthGuard } from '../shared/auth/auth.guard';
import { FlightResolver } from './flight-edit/flight.resolver';

const FLIGHT_BOOKING_ROUTES: Routes = [
  {
    path: '',
    component: FlightBookingComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'flight-search',
        pathMatch: 'full'
      },
      {
        path: 'flight-search',
        component: FlightSearchComponent
      },
      {
        path: 'flight-edit/:id',
        component: FlightEditComponent,
        resolve: {
          flight: FlightResolver
        }
      },
      {
        path: 'reactive-flight-search',
        component: ReactiveFlightSearchComponent
      },
      {
        path: 'passenger-search',
        component: PassengerSearchComponent
      }

    ]
  },
];

export const FlightBookingRouterModule
              = RouterModule.forChild(FLIGHT_BOOKING_ROUTES);
