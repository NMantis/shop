import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';
import { Address } from 'src/app/models/address.model';
import { ProductService } from 'src/app/services/product.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from '../../../models/order.model';
import { OrderList } from '../../../models/orderlist.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class MyOrdersComponent implements OnInit {
  userId: String;
  columnsToDisplay = ['Order Code', 'Method', 'Total', 'Date', 'Status'];
  expandedElement: Product[] | null;
  orders: Order[];

  constructor (private cookie: CookieService,
                private userService: UserService,
                private orderSevice: OrdersService) {}

  ngOnInit() {
    if (this.cookie.check('auth')) {
      const tok = jwt_decode(this.cookie.get('auth'));
      this.userId = tok.userId;
      this.orderSevice.getOrdersByUser(this.userId)
      .subscribe((data: Order[]) => {
        this.orders = data;
      });
    }
  }

  getAddress(id) {
    let address;
    this.userService.getAddressById(id)
    .subscribe(adr => {
       address = adr.street + '' + adr.number;
    });
    return address;
  }

}

