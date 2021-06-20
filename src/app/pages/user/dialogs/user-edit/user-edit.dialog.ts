import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpinnerDialog } from 'src/app/shared/dialogs/spinner/spinner.dialog';
import { UserService } from 'src/app/modules/user/services/user.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.dialog.html',
  styleUrls: ['./user-edit.dialog.scss']
})
export class UserEditDialog implements OnInit {
  formEdit: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _user: UserService
  ) { }

  ngOnInit(): void {
    this.formEdit = this.fb.group({
      firstname: [this.data.firstname],
      lastname: [this.data.lastname],
      email: [this.data.email, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      account: [this.data.account, [Validators.required, Validators.minLength(6)]],
      password: [this.data.password, [Validators.required, Validators.minLength(6)]],
      phone: [this.data.phone, [Validators.required, Validators.minLength(10), Validators.maxLength(11)]]
    })
  }

  checkAccount() {
    if(this.formEdit.controls.account.errors) {
      return this.formEdit.controls.account.hasError('required') ? 'Account is required' : 'Account must more than 5 characters';
    }
  }
  checkPassword() {
    if(this.formEdit.controls.password.errors) {
      return this.formEdit.controls.password.hasError('required') ? 'Password is required' : 'Password must more than 5 characters';
    }
  }
  checkPhone() {
    if(this.formEdit.controls.phone.errors) {
      return this.formEdit.controls.phone.hasError('required') ? 'Phone is required' : 'Phone must minimum 10 number and maximum 11 number';
    }
  }

  onSubmitted() {
    let id = this.data._id;
    let form = this.formEdit.value;    
    this.dialog.open(SpinnerDialog);
    this._user.edit(id, form).subscribe((res: User) => {     
      this.dialog.closeAll();      
    })
  }
}
