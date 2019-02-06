import { Component, OnInit, Input } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from '../../../models/order.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Product } from 'src/app/models/product.model';
import { DialogComponent } from '../../dialog/dialog.component';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class OrdersComponent implements OnInit {

  @Input() ords: Boolean;

  ordOpts = [
    {value: 'all', viewValue: 'All Orders'},
    {value: 'completed', viewValue: 'Completed Orders'},
    {value: 'new', viewValue: 'New Orders'}
  ];
  columnsToDisplay = ['Order Code', 'Method', 'Total', 'Date', 'Status', 'Action'];
  orders: Order[];
  expandedElement: Product[] | null;
  option: any;

  constructor(private orderService: OrdersService,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

  selectedOption(event) {

    this.option = event;

    if (event === 'all') {
      this.orderService.getAll()
      .subscribe((data: Order[]) => {
        this.orders = data;
      });
    } else if (event === 'completed') {
      this.orderService.getCompleted()
      .subscribe((data: Order[]) => {
        this.orders = data;
      });
    } else {
      this.orderService.getNew()
      .subscribe((data: Order[]) => {
        this.orders = data;
      });
    }
  }

  changeStatusDialog(id) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { action: 'changeOrderStatus' ,
              id: id,
              from: 'orders'
            }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption(this.option);
    });
  }

}
