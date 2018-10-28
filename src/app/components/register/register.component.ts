import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { compareValidator } from '../../directives/compare-validator.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {


  addressForm = this.fb.group({
    company: null,
    firstName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
    lastName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
    street: [null, [Validators.required,  Validators.minLength(3), Validators.maxLength(16)]], // more validators after test!!!!!!
    number: [null, Validators.required],
    city: [null, [Validators.required,  Validators.minLength(3)]],
    postalCode: [null, [
      Validators.required, Validators.minLength(5), Validators.maxLength(5)
    ]],
    gender: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(12) ]],
    passwordConfirm: ['', [Validators.required, compareValidator('password')]]
  });

  constructor(private fb: FormBuilder) {}




 onSubmit() {
    alert('Thanks!');
  }
}
