import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { stripGeneratedFileSuffix } from '@angular/compiler/src/aot/util';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(`${this.uri}/order/`);
  }

  getOrdersByUser(id) {
    return this.http.get<any>(`${this.uri}/order/personal/${id}`);
  }

  addOrder(product, method, address, userId) {
    const order = {
      products: product,
      method: method,
      address_id: address
    };
    return this.http.post<any>(`${this.uri}/order/user/${userId}`, order);
  }

  addGuestOrder(products, method, Fname, Lname, email, city, street?, number?, postalcode?) {
    if (method === 'House Delivery') {
      const order = {
        products: products,
        method: method,
        Fname: Fname,
        Lname: Lname,
        email: email,
        street: street,
        number: number,
        postalcode: postalcode,
        city: city
      };
      return this.http.post<any>(`${this.uri}/order/guest`, order);
    } else {
      const order = {
        products: products,
        method: method,
        Fname: Fname,
        Lname: Lname,
        email: email,
        city: city
      };
      return this.http.post<any>(`${this.uri}/order/guest`, order);
    }
  }

  deleteOrder(id) {
    return this.http.delete<any>(`${this.uri}/order/${id}`);
  }

  changeStatus(id, status) {
    return this.http.patch(`${this.uri}/order/${id}`, status);
  }

  getNew() {
    return this.http.get(`${this.uri}/order/new`);
  }

  getCompleted() {
    return this.http.get(`${this.uri}/order/completed`);
  }
}
