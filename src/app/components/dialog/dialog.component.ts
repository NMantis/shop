import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserService } from '../../services/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  msg: string;

  addressForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.addressForm = this.fb.group({
        street: [this.data.street , [Validators.required, Validators.pattern('[a-zA-Z α-ωΑ-Ω΄όίήύώέάΆΈΊΌΎΉΏ]{3,16}')]],
        number: [this.data.number , Validators.required],
        city: [this.data.city , [Validators.required, Validators.pattern('[a-zA-Z α-ωΑ-Ω΄όίήύώέάΆΈΊΌΎΉΏ]{3,16}')]],
        postalCode: [this.data.postalCode , [ Validators.required, Validators.pattern('[0-9]{5}')]]
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteAddress() {
    this.userService.deleteAddress(this.data.id)
    .subscribe(res => {
      this.data.action = '';
      this.msg = 'Address Deleted.' ; },
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


  ngOnInit() {
  }

}
