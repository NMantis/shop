import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private cookie: CookieService,
              public router: Router,
              public jwtHelper: JwtHelperService) { }

  isAuthenticated(): boolean {
    const token = this.cookie.get('auth');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
