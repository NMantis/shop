import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  addProduct(name, description, price, productImage, category) {
    const product = {
      name: name,
      description: description,
      price: price,
      productImage: productImage,
      active: true,
      category: category
    };
    return this.http.post<any>(`${this.uri}/product/`, product);
  }

  deleteProduct(id) {
    return this.http.delete(`${this.uri}/product/${id}`);
  }

}
