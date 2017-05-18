import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FlightSearchComponent } from './flight-booking/flight-search/flight-search.component';
import { FlightService } from './flight-booking/flight-search/flight.service';
import { BASE_URL } from './app.tokens';
import { CityPipe } from './shared/pipes/city.pipe';
// import { FlightBookingModule } from './flight-booking/flight-booking.module';
import { EventService } from './event.service';
import { BasketComponent } from './basket/basket.component';
import { AppRouterModule } from './app.routes';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //FlightBookingModule,
    AppRouterModule,
    SharedModule,
    AuthModule.forRoot(),
    OAuthModule.forRoot()
  ],
  declarations: [
    AppComponent,
    BasketComponent,
    HomeComponent
  ],
  providers: [
    // { provide: FlightService, useClass: FlightService }
    // FlightService
    EventService,
    { provide: BASE_URL, useValue: 'http://www.angular.at/api'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
