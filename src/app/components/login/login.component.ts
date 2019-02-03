import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { map, mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  vToken: any;


  constructor(private location: Location,
              private userService: UserService,
              private router: Router,
              private cookie: CookieService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.vToken = this.route.snapshot.params;
    if (Object.keys(this.vToken).length !== 0) {
      this.route.params
        .pipe(
          map(params => params.vtok),
          mergeMap(vtok =>
            this.userService.accountConfirmation(vtok))

        ).subscribe(result => console.log('Email verified, please login'));
    }

  }


  checkLogin(email, password) {
    this.userService.userLogin(email, password)
      .subscribe(res => {
        this.cookie.set('auth', res.token, 90000000);
        window.location.reload();
        this.router.navigate(['/home']);
      }, err => {
        console.log(err);
      });
  }

  goBack() {
    this.location.back();
  }
}
