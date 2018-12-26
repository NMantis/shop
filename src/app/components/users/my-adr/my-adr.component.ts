import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { UserService } from '../../../services/user.service';
import { Address } from '../../../models/address.model';
import * as jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { map, mergeMap } from 'rxjs/operators';
import { DialogComponent } from '../../dialog/dialog.component';
import {MatDialog} from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-my-adr',
  templateUrl: './my-adr.component.html',
  styleUrls: ['./my-adr.component.css'],
})
export class MyAdrComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: Address[];

  length: number;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['street', 'number', 'city', 'postalcode', 'action'];
  animal: string;
  name: string;
  constructor(
    private userService: UserService,
    private cookie: CookieService,
    public dialog: MatDialog) {}


  ngOnInit() {
    const tok = jwt_decode(this.cookie.get('auth'));
    this.userService.getUserInfo(tok.userId)
    .pipe(
      map(res => res._id),
      mergeMap(id => this.userService.getUserAddresses(id))
    ).subscribe((data: Address[]) => {
      this.dataSource = data;
      this.length = data.length;
      /* for (let i = 0; i <= adr.adds.length; i++) {
        console.log(this.addresses[i].id);
        this.addresses[i].id = adr.adds[i]._id;
        this.addresses[i].city = adr.adds[i].city;
        this.addresses[i].number = adr.adds[i].number;
        this.addresses[i].street = adr.adds[i].street;
        this.addresses[i].postalcode = adr.adds[i].postalcode;
      }
      */
    });
  }

  editAddress(id, street, postalCode, number, city) {

  }

  deleteAddress(id) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
