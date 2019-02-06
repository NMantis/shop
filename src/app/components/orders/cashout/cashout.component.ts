import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';
import { map, mergeMap } from 'rxjs/operators';
import { Address } from '../../../models/address.model';
import { Product } from '../../../models/product.model';
import { CartService } from '../../../services/cart.service';
import { Location } from '@angular/common';
import { DialogComponent } from '../../dialog/dialog.component';
import {MatDialog} from '@angular/material';
import { OrdersService } from '../../../services/orders.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cashout',
  templateUrl: './cashout.component.html',
  styleUrls: ['./cashout.component.css']
})
export class CashoutComponent implements OnInit {
  userId: string;
  dataSource: Address[] = [];
  selected = 'Address';
  products: Product[];
  displayedColumns: string[] = ['num', 'item', 'quantity', 'price'];
  private adId;

  private methods = [
    { num: 1, way: 'House Delivery' },
    { num: 2, way: 'Pick-up From Store' }
  ];

  constructor(private cookie: CookieService,
    private userService: UserService,
    private cartService: CartService,
    private location: Location,
    public dialog: MatDialog,
    private orderService: OrdersService,
    private route: Router,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.products = this.cartService.getCartItems();
    this.getAddresses();
  }

  getTotalCost() {    // Get total cost
    return this.products.map(t => t.price * t.quantity).reduce((acc, value) => acc + value, 0);
  }

  addAddressDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { action: 'add' ,
              id: this.userId,
              street: null,
              postalCode: null,
              number: null,
              city: null,
              from: 'addr'}
    });
    dialogRef.afterClosed().subscribe(result => this.getAddresses());
  }

  guestInfoDialog(method) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { action: 'guestOrder' ,
              method: method,
              products: this.products,
              from: 'guestCart'
            }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.route.navigate(['home']);
    });
  }

  goBack() {
    this.location.back();
  }

  placeOrder(method) {
    this.orderService.addOrder(this.products, method, this.adId, this.userId)
    .subscribe(result => {
      this.cartService.removeAll();
      this.cartService.updateCount(0);
      this.snackbar.open('Success!! Check your email for your order information', 'OK', {
        duration: 5000
      });
      setTimeout(() => this.route.navigate(['home']), 5000);
    }, err => {
      this.snackbar.open('There seems to be a problem', 'OK', {
        duration: 5000
      });
      setTimeout(() => this.route.navigate(['home']), 5000);
    });
  }

  getAddresses() {
    if (this.cookie.check('auth')) {
      const tok = jwt_decode(this.cookie.get('auth'));
      this.userId = tok.userId;
      this.userService.getUserInfo(tok.userId)
        .pipe(
          map(res => res._id),
          mergeMap(id => this.userService.getUserAddresses(id))
        ).subscribe((data: Address[]) => {
          this.dataSource = data;
        });
    }
  }
  selectedAddress(event) {
    this.adId = event;
  }
}


