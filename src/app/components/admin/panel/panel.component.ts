import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
showOrd: Boolean;
showProd: Boolean;
  constructor() { }

  ngOnInit() {
  }

  getOrders() {
    this.showOrd = true;
    this.showProd = false;
  }

  getProducts() {
    this.showOrd = false;
    this.showProd = true;
  }
}
