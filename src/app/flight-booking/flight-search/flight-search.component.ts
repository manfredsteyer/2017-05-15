
import { Component } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { FlightService } from './flight.service';
import { Flight } from '../../entities/flight';

@Component({
  selector: 'flight-search',
  templateUrl: 'flight-search.component.html',
  providers: [FlightService]
})
export class FlightSearchComponent {

  from: string;
  to: string;
  flights: Array<Flight> = [];
  selectedFlight: Flight;
  basket: any = {
    "3": true,
    "4": false,
    "5": true
  };
  //private http: Http;

  constructor(private flightService: FlightService) {
    // this.http = http;
  }
  search(): void {

    this.flightService
        .find(this.from, this.to)
        .subscribe(
          (flights: Flight[]) => {
            this.flights = flights;
          },
          (errResp) => {
            console.error('Fehler beim Laden', errResp);
          }
        )

  }

  select(f: Flight) {
    this.selectedFlight = f;
  }

}
