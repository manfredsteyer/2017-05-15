
import { Component } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
@Component({
  selector: 'home',
  template: `
    <h1>Willkommen {{userName}}</h1>
    <button (click)="login()">Login</button>
    <button (click)="logout()">Logout</button>
  `
})
export class HomeComponent {

  constructor(private authService: AuthService) {
  }

  get userName() {
    return this.authService.userName;
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

}
