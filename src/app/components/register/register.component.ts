import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import {MatSlideToggleChange} from '@angular/material';
import { compareValidator } from '../../directives/compare-validator.directive';
import { MatSnackBar } from '@angular/material';

import { mergeMap, map } from 'rxjs/operators';

import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent  implements OnInit {

  password: string;

  addressForm = this.fb.group({
    firstName: [null, [Validators.required, Validators.pattern('[a-zA-Z α-ωΑ-Ω΄όίήύώέάΆΈΊΌΎΉΏ]{3,16}')]],
    lastName: [null, [Validators.required, Validators.pattern('[a-zA-Z α-ωΑ-Ω΄όίήύώέάΆΈΊΌΎΉΏ]{3,16}')]],
    street: [null, [Validators.required, Validators.pattern('[a-zA-Z α-ωΑ-Ω΄όίήύώέάΆΈΊΌΎΉΏ]{3,16}')]],
    number: [null, Validators.required],
    city: [null, [Validators.required, Validators.pattern('[a-zA-Z α-ωΑ-Ω΄όίήύώέάΆΈΊΌΎΉΏ]{3,16}')]],
    postalCode: [null, [
      Validators.required, Validators.pattern('[0-9]{5}')
    ]],
    gender: [null, Validators.required],
    email: [null, Validators.required],
    password: [this.password, Validators.required],
    passwordConfirm: ['', [Validators.required, compareValidator('password')]],
  });

  mailAlreadyExists =  false;
  inputType = 'password';
  constructor(private fb: FormBuilder,
              private snackbar: MatSnackBar,
              private userService: UserService,
              private location: Location) {}



  ngOnInit() {
  }

  onStrengthChanged(strength: number) {
    console.log('password strength = ', strength);
  }

  onSlideToggleChange(event: MatSlideToggleChange) {
    event.checked ? this.inputType = 'text' : this.inputType = 'password';
  }


 onSubmit(email, firstname, lastname, password, street, number, postalCode, city, gender) {
  this.userService.userSignUp(email, firstname, lastname, password, gender)
  .pipe(
    map(result => result.id),
    mergeMap( id => {
     if (id !== null && id !== undefined) {
       return this.userService.saveAddress( id, street, number, postalCode, city);
     }
    })
  )
   .subscribe(event => {
    this.snackbar.open(`A mail has been sent to ${email}`, 'OK', {
      duration: 5000
    });
    setTimeout(() => this.location.back(), 5000);
   }, err => {
    if (err.status === 409) {
      this.addressForm.get('email').setValue('');
      this.snackbar.open('Email Already Exists!', 'OK', {
        duration: 20000
      });
    } else {
      console.log(err);
     this.snackbar.open('Server not Responding', 'OK', {
        duration: 10000
      });
    }
   });
  }
}
