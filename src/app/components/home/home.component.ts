import { Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

user = {};

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );


  constructor(private breakpointObserver: BreakpointObserver,
    private cookie: CookieService,
    private userService: UserService,
    private router: Router) {

      if (this.cookie.check('auth')) {
         const tok = jwt_decode(this.cookie.get('auth'));
         this.userService.getUserInfo(tok.userId)
          .subscribe(res => {
           this.user = { firstname: res.firstname, lastname: res.lastname } ;
            return this.user;
          });
        }
  }


  ngOnInit() {

  }

  userLogout() {
    this.cookie.delete('auth');
    this.user = { firstname: ''};
    this.router.navigate(['home']);
  }


}
