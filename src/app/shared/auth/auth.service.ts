import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  userName: string = null;

  get isLoggedIn() {
    return this.userName != null;
  }

  login() {
    this.userName = 'Max';
  }

  logout() {
    this.userName = null;
  }

}
