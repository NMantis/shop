import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../services/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { OrdersService } from 'src/app/services/orders.service';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  msg: string;
  uploader: FileUploader = new FileUploader({ url: 'http://localhost:3000/product/image' });
  addressForm: FormGroup;
  productForm: FormGroup;
  guestForm: FormGroup;
  orderId: String;

  constructor(
    private fb: FormBuilder,
    private orderService: OrdersService,
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
    } else if (data.from === 'guestCart') {
      this.guestForm = this.fb.group({
        firstName: [null, [Validators.required, Validators.pattern('[a-zA-Z α-ωΑ-Ω΄όίήύώέάΆΈΊΌΎΉΏ]{3,16}')]],
        lastName: [null, [Validators.required, Validators.pattern('[a-zA-Z α-ωΑ-Ω΄όίήύώέάΆΈΊΌΎΉΏ]{3,16}')]],
        street: [null, [Validators.required, Validators.pattern('[a-zA-Z α-ωΑ-Ω΄όίήύώέάΆΈΊΌΎΉΏ]{3,16}')]],
        number: [null, Validators.required],
        city: [null, [Validators.required, Validators.pattern('[a-zA-Z α-ωΑ-Ω΄όίήύώέάΆΈΊΌΎΉΏ]{3,16}')]],
        postalCode: [null, [
          Validators.required, Validators.pattern('[0-9]{5}')
        ]],
        email: [null, Validators.required]
      });
    } else if (data.from === 'orders') {
        this.orderId = data.id;
    } else {
      this.productForm = this.fb.group({
        name: [this.data.name, Validators.required],
        price: [this.data.price, [Validators.required, Validators.pattern('[0-9]{1,10}')]],
        stock: [this.data.stock, [Validators.required, Validators.pattern('[0-9]{1,12}')]],
        description: [this.data.description, Validators.required],
        category: [this.data.category, Validators.required],
        image: [this.data.image]
      });
    }

    if ((data.from === 'guestCart') && (data.method === 'Pick-up From Store')) {
      this.guestForm.get('street').setValidators(null);
      this.guestForm.get('number').setValidators(null);
      this.guestForm.get('postalCode').setValidators(null);
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

  addProduct(category) {
    const price = this.productForm.get('price').value;
    const name = this.productForm.get('name').value;
    const stock = this.productForm.get('stock').value;
    const description = this.productForm.get('description').value;

    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      const fileResponse = JSON.parse(response);

      this.productService.addProduct(name, description, price, category, stock, fileResponse.path)
        .subscribe(res => {
          this.data.action = '';
          this.msg = 'Product Added Succesfully.';
        }, err => {
          this.data.action = '';
          this.msg = 'Uknown Error.';
        });
    };
  }

  editProduct(price, description, category, stock, name) {
    const _id = this.data.id;
    if (this.uploader.queue.length) {
      this.uploader.uploadAll();
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        const fileResponse = JSON.parse(response);
        const productImage = fileResponse.path;
        console.log(productImage);

        this.productService.editProduct({ _id, price, description, category, stock, name, productImage } as Product)
          .subscribe(res => {
            this.data.action = '';
            this.msg = 'Product Updated Succesfully.';
          }, err => {
            this.data.action = '';
            this.msg = 'Uknown Error.' + err;
          });
      };
    } else {
      this.productService.editProduct({ _id, price, description, category, stock, name} as Product)
          .subscribe(res => {
            this.data.action = '';
            this.msg = 'Product Updated Succesfully.';
          }, err => {
            this.data.action = '';
            this.msg = 'Uknown Error.' + err;
          });
    }


  }

  guestOrderSubmit() {
    const fname = this.guestForm.get('firstName').value;
    const lname = this.guestForm.get('lastName').value;
    const email = this.guestForm.get('email').value;
    const city = this.guestForm.get('city').value;

    if (this.data.method === 'House Delivery') {
      const street = this.guestForm.get('street').value;
      const number = this.guestForm.get('number').value;
      const postalcode = this.guestForm.get('postalCode').value;
      this.orderService
        .addGuestOrder(this.data.products, this.data.method, fname, lname, email, city, street, number, postalcode)
        .subscribe(res => {
          this.data.action = '';
          this.msg = 'Order Placed. You have received an email containing information about your order';
          localStorage.clear();
        }, err => {
          this.data.action = '';
          this.msg = 'Uknown Error.' + err;
        });
    } else {
      this.orderService.addGuestOrder(this.data.products, this.data.method, fname, lname, email, city)
        .subscribe(res => {
          this.data.action = '';
          this.msg = 'Order Placed. You have received an email containing information about your order';
          localStorage.clear();
        }, err => {
          this.data.action = '';
          this.msg = 'Uknown Error.' + err;
        });
    }
  }


  changeStatus(status) {
    this.orderService.changeStatus(this.data.id, status)
    .subscribe(res => {
      this.data.action = '';
      this.msg = 'Status Changed';
      localStorage.clear();
    }, err => {
      this.data.action = '';
      this.msg = 'Uknown Error.' + err;
    });
  }
  ngOnInit() {
  }

}
