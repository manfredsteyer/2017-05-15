
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { FlightService } from './flight.service';
import { Flight } from '../../entities/flight';
import { NgForm } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'flight-search',
  templateUrl: 'flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  //providers: [FlightService]
})
export class FlightSearchComponent {

  from: string;
  to: string;
  // flights: Array<Flight> = [];
  selectedFlight: Flight;

  // flights --> flights()
  get flights() {
    return this.flightService.flights;
  }

  @ViewChild('f')
  form: NgForm;

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
      this.flightService.find(this.from, this.to);
  }

  select(f: Flight) {
    this.selectedFlight = f;
  }

}
