import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Address } from '../../../models/address.model';
import * as jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-addresses',
  templateUrl: './my-addresses.component.html',
  styleUrls: ['./my-addresses.component.css']
})
export class MyAddressesComponent implements OnInit {

  displayedColumns: string[] = ['street', 'number', 'postalcode'];
  addresses: Address[];
  constructor(
              private userService: UserService,
              private cookie: CookieService
  ) { }

  ngOnInit() {
    const tok = jwt_decode(this.cookie.get('auth'));
    this.userService.getUserInfo(tok.userId)
    .pipe(
      map(res => res._id),
      mergeMap(id => this.userService.getUserAddresses(id))
    ).subscribe((data: Address[]) => {
      this.addresses = data;
      /* for (let i = 0; i <= adr.adds.length; i++) {
        console.log(this.addresses[i].id);
        this.addresses[i].id = adr.adds[i]._id;
        this.addresses[i].city = adr.adds[i].city;
        this.addresses[i].number = adr.adds[i].number;
        this.addresses[i].street = adr.adds[i].street;
        this.addresses[i].postalcode = adr.adds[i].postalcode;
      }
      */
       console.log(this.addresses);
    });
  }

}
