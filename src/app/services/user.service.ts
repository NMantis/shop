import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }



  userSignUp(email, firstname, lastname, password, gender) {
    const user = {
      email: email,
      gender: gender,
      firstname: firstname,
      lastname: lastname,
      password: password
    };
    return this.http.post<any>(`${this.uri}/user/signup`, user);
  }

  saveAddress(id, street, number, postalCode, city) {
    const address = {
      user_id: id,
      street: street,
      number: number,
      postalcode: postalCode,
      city: city
    };
    return this.http.post(`${this.uri}/address/add/${id}`, address);
  }


  userLogin(email, password) {
    const user = {
      email: email,
      password: password
    };
   return this.http.post<any>(`${this.uri}/user/login`, user);
  }

  accountConfirmation(token) {
    return this.http.post(`${this.uri}/user/confirmation/${token}`, '');
  }

  getUserInfo(id) {
    return this.http.get<any>(`${this.uri}/user/${id}`);
  }

  getUserAddresses(id) {
    return this.http.get<any>(`${this.uri}/address/show/${id}`);
  }

  editAddress(id, street, postalCode, number, city) {
    const address = {
      street: street,
      number: number,
      postalcode: postalCode,
      city: city
    };
    return this.http.post(`${this.uri}/address/edit/${id}`, address);
  }

  deleteAddress(id) {
    return this.http.delete(`${this.uri}/address/${id}`);
  }
}
