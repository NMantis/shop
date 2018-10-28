import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {MatSlideToggleChange} from '@angular/material';
import { compareValidator } from '../../directives/compare-validator.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent  implements OnInit {


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
    password: [null, Validators.required],
    passwordConfirm: ['', [Validators.required, compareValidator('password')]]
  });

  password: string;
  inputType = 'password';
  color = '';
  constructor(private fb: FormBuilder,
              private titleService: Title) {}



  ngOnInit() {
    this.titleService.setTitle('Home | @angular-material-extensions/password-strength');
  }

  onStrengthChanged(strength: number) {
    console.log('password strength = ', strength);
  }

  onSlideToggleChange(event: MatSlideToggleChange) {
    event.checked ? this.inputType = 'text' : this.inputType = 'password';
  }
 onSubmit() {
    alert('Thanks!');
  }
}
