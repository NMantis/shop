import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  @Input() ords: Boolean;

  ordOpts = [
    {value: 'all', viewValue: 'All Orders'},
    {value: 'completed', viewValue: 'Completed Orders'},
    {value: 'new', viewValue: 'New Orders'}
  ];

  constructor() { }

  ngOnInit() {
  }

  selectedOption(event) {
    console.log(event);
  }

}
