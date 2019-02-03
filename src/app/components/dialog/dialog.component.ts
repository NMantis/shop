import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../services/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  msg: string;

  addressForm: FormGroup;
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public userService: UserService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    if (data.from === 'addr') {
      this.addressForm = this.fb.group({
        street: [this.data.street, [Validators.required, Validators.pattern('[a-zA-Z α-ωΑ-Ω΄όίήύώέάΆΈΊΌΎΉΏ]{3,16}')]],
        number: [this.data.number, Validators.required],
        city: [this.data.city, [Validators.required, Validators.pattern('[a-zA-Z α-ωΑ-Ω΄όίήύώέάΆΈΊΌΎΉΏ]{3,16}')]],
        postalCode: [this.data.postalCode, [Validators.required, Validators.pattern('[0-9]{5}')]]
      });
    } else {
      this.productForm = this.fb.group({
        name: [this.data.name, Validators.required],
        price: [this.data.price, [Validators.required, Validators.pattern('[0-9]{1,10}')]],
        stock: [this.data.stock, [Validators.required, Validators.pattern('[0-9]{1,12}')]],
        description: [this.data.description],
        category: [this.data.category, Validators.required],
        image: [this.data.image]
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteAddress() {
    this.userService.deleteAddress(this.data.id)
      .subscribe(res => {
        this.data.action = '';
        this.msg = 'Address Deleted.';
      },
        err => {
          this.data.action = '';
          this.msg = 'Uknown Error.';
        });
  }

  onSubmit(street, number, postalcode, city) {
    this.userService.saveAddress(this.data.id, street, number, postalcode, city)
      .subscribe(result => {
        this.data.action = '';
        this.msg = 'Address Added.';
      }, err => {
        this.data.action = '';
        this.msg = 'Uknown Error.';
      });
  }

  editAddress(street, postalcode, number, city) {
    this.userService.editAddress(this.data.id, street, postalcode, number, city)
      .subscribe(res => {
        this.data.action = '';
        this.msg = 'Address Updated Succesfully.';
      }, err => {
        this.data.action = '';
        this.msg = 'Uknown Error.';
      });
  }

  editProduct(price, description, category, stock, name) {
    const _id = this.data.id;
    this.productService.editProduct({ _id, price, description, category, stock, name} as Product)
      .subscribe(res => {
        this.data.action = '';
        this.msg = 'Product Updated Succesfully.';
      }, err => {
        this.data.action = '';
        this.msg = 'Uknown Error.' + err;
      });
  }


  ngOnInit() {
  }

}
