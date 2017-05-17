
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Flight } from '../../entities/flight';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlightService } from '../flight-search/flight.service';
import { CityValidator } from '../../shared/validation/city.validator';
import { Observable } from 'rxjs';
import { EventService } from '../../event.service';

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
  loading = false;

  formMetaData = [
    { label:  'Airport of Departure', name: 'from'},
    { label:  'Airport of Destination', name: 'to'},
  ];

  flights$: Observable<Flight[]>;

  constructor(
    private flightService: FlightService,
    private fb: FormBuilder,
    private eventService: EventService) {
    // this.http = http;
    this.filter = fb.group({
      from: [
        '',
        [
          // Validators.minLength(3),
          // Validators.maxLength(30),
          // Validators.required,
          // Validators.pattern('[A-Za-z]*'),
          //CityValidator.validateCity,
          //CityValidator.validateCityWithParams(['Graz', 'Hamburg'])
        ]
      ],
      to: [
        ''
      ]
    });


    this.flights$ = this
                      .filter
                      .valueChanges
                      .debounceTime(500)
                      .filter(v => v.from.length > 2 )
                      .distinctUntilChanged( (oldVal, newVal) => oldVal.from === newVal.from)
                      .filter(value => this.filter.valid)
                      .do((v) => {
                        console.debug(v);
                        this.loading = true;
                      })
                      .switchMap(value => this.flightService.find(value.from, value.to))
                      .do((v) => {
                        console.debug(v);
                        this.loading = false;
                      });



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
    this.eventService.flightSelected.next(f);
  }

}
