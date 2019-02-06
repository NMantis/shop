import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartCount: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  countMsg = this.cartCount.asObservable();

  constructor() { }

  updateCount(count: any) {
    this.cartCount.next(count);
  }

  getCount(): any {
    return this.cartCount.asObservable();
  }

  getCartItems() {
    return JSON.parse(localStorage.getItem('product'));
  }

  addToCart(products: any) {
    localStorage.setItem('product', JSON.stringify(products));
  }

  updateQuantity(product: any, change) {
    const update = this.getCartItems();
    for ( let i = 0; i < update.length; i++ ) {
      if (update[i]._id === product._id) {
        if (( (update[i].quantity + change) > 0 ) && (update[i].quantity + change <= update[i].stock) ) {
          update[i].quantity += change;
        }
      }
    }
    this.addToCart(update);
  }

  removeItem(index) {
    const temp = this.getCartItems();
    temp.splice(index, 1);
    this.removeAll();
    this.addToCart(temp);
  }

  removeAll() {
    this.cartCount = new BehaviorSubject(0);
    return localStorage.removeItem('product');
  }


  errorHandler(error: Response) {
    console.log(error);
    return throwError(error);
  }
}
