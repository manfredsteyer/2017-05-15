
import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth/auth.service';
@Component({
  selector: 'passenger-search',
  template: `
    <h1>Passenger Search</h1>
    <div class="card">
    Et tu, {{userName}}?
    </div>
  `
})
export class PassengerSearchComponent {

  constructor(private authService: AuthService) {

  }

  get userName() {
    return this.authService.userName;
  }
}
