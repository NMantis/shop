import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getProductsByCat(category) {
    return this.http.get<any>(`${this.uri}/product/cat/${category}`);
  }

  getProductsById(id) {
    return this.http.get<any>(`${this.uri}/product/prod/${id}`);
  }

  getAll() {
    return this.http.get<any>(`${this.uri}/product/all`);
  }

  addProduct(name, description, price, category, stock, path) {
    const product = {
      name: name,
      description: description,
      price: price,
      path: path,
      category: category,
      stock: stock
    };
    return this.http.post<any>(`${this.uri}/product/`, product);
  }

  editProduct( product: Product ) {
    return this.http.patch(`${this.uri}/product/${product._id}`, product);
  }

  deleteProduct(id) {
    return this.http.delete(`${this.uri}/product/${id}`);
  }

}
