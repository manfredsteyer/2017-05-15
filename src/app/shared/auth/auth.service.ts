import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthService {

  get userName() {
    let claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['given_name'];
  }

  constructor(private oauthService: OAuthService) {
  }

  get isLoggedIn() {
    return this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken();
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

}
