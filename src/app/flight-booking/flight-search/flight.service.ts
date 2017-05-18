
import { Observable } from 'rxjs';
import { Flight } from '../../entities/flight';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { BASE_URL } from '../../app.tokens';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class FlightService {

  constructor(
    private http: Http,
    @Inject(BASE_URL) private baseUrl: string,
    private oauthService: OAuthService) {
      console.debug('Liebesgrüße aus dem Konstruktor!');
  }

  flights: Flight[] = [];

  find(from: string, to: string): void {
    let url = this.baseUrl + '/secureflight/byRoute';



    let search = new URLSearchParams();
    search.set('from', from);
    search.set('to', to);

    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Authorization', this.oauthService.authorizationHeader());

    this
        .http
        .get(url, {headers, search})
        .map(resp => resp.json())
        .subscribe(
          flights => {
            this.flights = flights;
          },
          err => {
            console.error(err)
          }
        );
  }

}
