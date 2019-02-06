import { Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { RoleGuardService } from '../../services/role-guard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

cartCount: any;
private user = {};
private isAdmin: Boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );


  constructor(private breakpointObserver: BreakpointObserver,
    private cookie: CookieService,
    private userService: UserService,
    private router: Router,
    private cartService: CartService,
    private role: RoleGuardService) {

      if (this.cookie.check('auth')) {
         const tok = jwt_decode(this.cookie.get('auth'));
         this.userService.getUserInfo(tok.userId)
          .subscribe(res => {
           this.user = { firstname: res.firstname, lastname: res.lastname } ;
            return this.user;
          });
        }

        this.isAdmin = this.role.isAdmin();

        this.cartService.getCount().subscribe(value => { this.cartCount = value; });
  }

  ngOnInit() {

  }

  userLogout() {
    this.cartService.removeAll();
    this.cartCount = 0;
    this.cookie.delete('auth');
    this.user = { firstname: ''};
    this.router.navigate(['home']);
    this.isAdmin = this.role.isAdmin();
  }


}
