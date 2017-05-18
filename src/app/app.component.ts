import { Component } from '@angular/core';
import { Observable } from 'rxjs';
                            // ^--- Alles
                            // rxjs/Observable

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hallo Welt!!!!!';

  doStuff() {
    this.title = "stuff done!";
  }

  showBasket = false;

  time$: Observable<number>;

  toggleBasket() {
    this.showBasket = !this.showBasket;
  }

  constructor() {
    let time$ = Observable
      .interval(1000)
      .startWith(0)
      .map(value => new Date(value * 1000))
      .do(value => {
        console.debug('New date', value);
      })
      .map(date => date.getSeconds());

    /*
    time$.subscribe(
      (date: Date) => {
        console.debug('date', date.getSeconds());
      }
    );

    time$.subscribe(
      (date: Date) => {
        console.debug('date 2', date.getSeconds());
      }
    );
  */

  }

}
