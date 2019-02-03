import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';

import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: Product[];
  displayedColumns: string[] = ['num', 'image', 'item', 'quantity', 'price', 'actions'] ;
  cartCount: number;
  isEmpty: Boolean = true;
  constructor(
    private cartService: CartService) {

     }

  ngOnInit() {
    this.products = this.cartService.getCartItems();
    if (this.products !== null ) {
      this.isEmpty = false;
    }
  }


  getTotalCost() {    // Get total cost
    if (this.products) {
      return this.products.map(t => t.price * t.quantity).reduce((acc, value) => acc + value, 0);
    }
  }

  updateCart(product, change) {                     // Increase or decrease the quantity
    this.cartService.updateQuantity(product, change);
    this.products = this.cartService.getCartItems();
  }

  deleteProd (product) {                      // Remove from cart
    this.cartService.removeItem(product);
    this.products = this.cartService.getCartItems();
    this.cartCount = this.products.length;
    this.cartService.updateCount(this.cartCount);
  }

  deleteAll() {                             // Clear Cart
    this.cartService.removeAll();
    this.products = this.cartService.getCartItems();
    this.cartService.updateCount(0);
    this.isEmpty = true;
  }
}
