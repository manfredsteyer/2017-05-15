import { Component } from '@angular/core';
import { EventService } from '../event.service';
import { Flight } from '../entities/flight';
@Component({
  selector: 'basket',
  templateUrl: './basket.component.html'
})
export class BasketComponent {

  flights: Array<Flight> = [];

  constructor(eventService: EventService) {
    eventService.flightSelected.subscribe(
      flight => {
        if (!flight) return;
        this.flights.push(flight);
        if (this.flights.length > 3) {
          this.flights = this.flights.slice(1);
        }


      }
    )
  }

}
