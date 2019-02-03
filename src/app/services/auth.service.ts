import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private cookie: CookieService,
              public router: Router,
              public jwtHelper: JwtHelperService) { }


  getToken() {
    return this.cookie.get('auth');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    // Check whether the token is expired and return
    // true or false
    if (token !== null) {
      return !this.jwtHelper.isTokenExpired(token);
    }
   return false;
  }

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
