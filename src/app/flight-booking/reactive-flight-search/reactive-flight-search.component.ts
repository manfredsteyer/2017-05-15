
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Flight } from '../../entities/flight';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlightService } from '../flight-search/flight.service';
import { CityValidator } from '../../shared/validation/city.validator';

@Component({
  selector: 'reactive-flight-search',
  templateUrl: 'reactive-flight-search.component.html',
  styleUrls: ['./reactive-flight-search.component.css'],
  providers: [FlightService]
})
export class ReactiveFlightSearchComponent {

  flights: Array<Flight> = [];
  selectedFlight: Flight;
  filter: FormGroup;

  basket: any = {
    "3": true,
    "4": false,
    "5": true
  };
  //private http: Http;

  formMetaData = [
    { label:  'Airport of Departure', name: 'from'},
    { label:  'Airport of Destination', name: 'to'},
  ];

  constructor(
    private flightService: FlightService,
    private fb: FormBuilder) {
    // this.http = http;

    this.filter = fb.group({
      from: [
        'Hamburg',
        [
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.required,
          Validators.pattern('[A-Za-z]*'),
          CityValidator.validateCity,
          CityValidator.validateCityWithParams(['Graz', 'Hamburg'])
        ]
      ],
      to: [
        'Graz'
      ]
    });

    this.filter.valueChanges.subscribe(form => {
      console.debug('das gesamte Formular', form);
    });

    this.filter.controls['from'].valueChanges.subscribe(value => {
      console.debug('das Feld from', value);
    })

  }
  search(): void {

    let from = this.filter.controls['from'].value;
    // this.filter.controls['from'].setValue('Kognito');

    this.flightService
        .find(this.filter.value.from, this.filter.value.to)
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
