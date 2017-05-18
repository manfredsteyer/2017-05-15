import { TestBed, async } from '@angular/core/testing';
import { FlightCardComponent } from './flight-card.component';
import { FlightSearchComponent } from './flight-search.component';
import { FlightBookingModule } from '../flight-booking.module';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { BASE_URL } from '../../app.tokens';

import 'rxjs/add/operator/map';
import { By } from '@angular/platform-browser';
import { FlightService } from './flight.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Flight } from '../../entities/flight';
import { MockBackend } from '@angular/http/testing';

let mockData = [
  { id: 4711, from: 'Kognito', to: 'Flagranti', date:'jetzt'},
  { id: 4712, from: 'Kognito', to: 'Flagranti', date:'jetzt'},
  { id: 4713, from: 'Kognito', to: 'Flagranti', date:'jetzt'},
  { id: 4714, from: 'Kognito', to: 'Flagranti', date:'jetzt'},
  { id: 4715, from: 'Kognito', to: 'Flagranti', date:'jetzt'}
];

let flightServiceMock = {
  find(from: string, to: string): Observable<Flight[]> {

    return new BehaviorSubject<Flight[]>(mockData);

  }
}

describe('FlightSearchComponent', () => {
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        FlightBookingModule,
        HttpModule
      ],
      declarations: [
      ],
      providers: [
        { provide: BASE_URL, useValue: 'http://www.angular.at/api' },
        { provide: XHRBackend, useClass: MockBackend }
      ]
    }).compileComponents();


    /*
    TestBed.overrideComponent(FlightSearchComponent, {
      set: {
        providers: [
          {
            provide: FlightService,
            useValue: flightServiceMock
          }
        ]
      }
    }).compileComponents();
    */
  }));

  it('should have an undef. selectedFlight initially', async(() => {

    let fixture = TestBed.createComponent(FlightSearchComponent);
    let comp = fixture.componentInstance;

    // fixture.detectChanges();
    // fixture.nativeElement // DOM des Templates
    // fixture.debugElement // Wrapper für DOM ^
    // fixture.debugElement.queryAll(By.css("button"));

    expect(comp.selectedFlight).toBeUndefined();

  }));

  it('should have no found flights initially', async(() => {

    let fixture = TestBed.createComponent(FlightSearchComponent);
    let comp = fixture.componentInstance;

    // fixture.detectChanges();
    // fixture.nativeElement // DOM des Templates
    // fixture.debugElement // Wrapper für DOM ^
    // fixture.debugElement.queryAll(By.css("button"));

    expect(comp.flights.length).toBe(0);

  }));

  it('should not search for flights without from and to', (done: Function) => {

    let fixture = TestBed.createComponent(FlightSearchComponent);
    let comp = fixture.componentInstance;
    comp.from = '';
    comp.to = '';
    comp.search();

    // Anhalten



  });

  it('should search for flights with from and to', () => {


    let backend = TestBed.get(XHRBackend);

    backend.connections.subscribe(cnn => {
      console.debug('request', cnn.request);
      cnn.mockRespond(
        new Response(
          new ResponseOptions(
            {
              body: JSON.stringify(mockData)})
        ))
    })


    let fixture = TestBed.createComponent(FlightSearchComponent);
    let comp = fixture.componentInstance;
    comp.from = 'Hamburg';
    comp.to = 'Graz';
    comp.search();
    expect(comp.flights.length).toBe(5);
  });
});
