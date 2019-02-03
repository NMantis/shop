import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

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
    return this.http.post<any>(`${this.uri}/order/${userId}`, order);
  }

  deleteOrder(id) {
    return this.http.delete<any>(`${this.uri}/order/${id}`);
  }

  changeStatus(id, status) {
    return this.http.patch(`${this.uri}/order/${id}`, status);
  }
}
