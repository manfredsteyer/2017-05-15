import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
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

  initAuth() {

    // URL of the SPA to redirect the user to after login
    this.oauthService.redirectUri = window.location.origin + "/index.html";

    // The SPA's id. The SPA is registerd with this id at the auth-server
    this.oauthService.clientId = "spa-demo";

    // set the scope for the permissions the client should request
    // The first three are defined by OIDC. The 4th is a usecase-specific one
    this.oauthService.scope = "openid profile email voucher";

    // set to true, to receive also an id_token via OpenId Connect (OIDC) in addition to the
    // OAuth2-based access_token
    this.oauthService.oidc = true;

    // Use setStorage to use sessionStorage or another implementation of the TS-type Storage
    // instead of localStorage
    this.oauthService.setStorage(sessionStorage);

    // The name of the auth-server that has to be mentioned within the token
    this.oauthService.issuer = "https://steyer-identity-server.azurewebsites.net/identity";

    // Load Discovery Document and then try to login the user
    this.oauthService.loadDiscoveryDocument().then(() => {

      // This method just tries to parse the token(s) within the url when
      // the auth-server redirects the user back to the web-app
      // It dosn't send the user the the login page
      this.oauthService.tryLogin({});

    });



  }

  constructor(private oauthService: OAuthService) {

    this.initAuth();


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
