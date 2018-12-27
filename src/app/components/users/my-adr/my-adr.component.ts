import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { UserService } from '../../../services/user.service';
import { Address } from '../../../models/address.model';
import * as jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { map, mergeMap } from 'rxjs/operators';
import { DialogComponent } from '../../dialog/dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-my-adr',
  templateUrl: './my-adr.component.html',
  styleUrls: ['./my-adr.component.css'],
})
export class MyAdrComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: Address[];
  userId: string;
  length: number;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['street', 'number', 'city', 'postalcode', 'action'];

  constructor(
    private userService: UserService,
    private cookie: CookieService,
    public dialog: MatDialog) {}


  ngOnInit() {
    this.getAddresses();
  }

  editAddressDialog(id, street, postalCode, number, city) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { action: 'edit' ,
              id: id,
              street: street,
              postalCode: postalCode,
              number: number,
              city: city
            }
    });

    dialogRef.afterClosed().subscribe(result => this.getAddresses());
  }

  deleteAddressDialog(id) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { action: 'delete' , id: id}
    });

    dialogRef.afterClosed().subscribe(result => this.getAddresses());
  }

  addAddressDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { action: 'add' ,
              id: this.userId,
              street: null,
              postalCode: null,
              number: null,
              city: null}
    });

    dialogRef.afterClosed().subscribe(result => this.getAddresses());
  }

  getAddresses() {
    const tok = jwt_decode(this.cookie.get('auth'));
    this.userId = tok.userId;
    this.userService.getUserInfo(tok.userId)
    .pipe(
      map(res => res._id),
      mergeMap(id => this.userService.getUserAddresses(id))
    ).subscribe((data: Address[]) => {
      this.dataSource = data;
      this.length = data.length;
    });
  }
}
