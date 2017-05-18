
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Flight } from '../../entities/flight';
import { Observable } from 'rxjs';
export class FlightResolver implements Resolve<Flight> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Flight> {

    return Observable
            .of({ id: route.params['id'], from: 'Graz', to: 'Stuttgart', date: 'jetzt' })
            .delay(5000);
  }

}
