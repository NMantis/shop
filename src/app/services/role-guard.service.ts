import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private router: Router,
    private cookie: CookieService,
    private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property

    try {
      const expectedRole = route.data.expectedRole;
      const token = this.cookie.get('auth');

      // decode the token to get its payload
      const tokenPayload = jwt_decode(token);
      if (
        !this.auth.isAuthenticated() ||
        tokenPayload.role !== expectedRole
      ) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    } catch (Error) {
      this.router.navigate(['/login']);
      return false;
    }
  }

  isAdmin() {

    try {

      const token = this.cookie.get('auth');

      // decode the token to get its payload
      const tokenPayload = jwt_decode(token);

      if (
        !this.auth.isAuthenticated() ||
        tokenPayload.role !== '_admin0'
      ) {
        return false;
      }

      return true;
    } catch (Error) {
        return false;
    }
  }
}

