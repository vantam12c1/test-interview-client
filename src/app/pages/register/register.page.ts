import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AlertDialog } from 'src/app/shared/dialogs/alert/alert.dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  formRegister: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 1;
  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      firstname: [''],
      lastname: [''],
      account: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]]
    })
  }

  onSubmitted() {    
    let form = this.formRegister;    
    if(form.invalid) {
      let arrError = [];
      if(form.controls.account.errors) {
        form.controls.account.hasError('required') ? arrError.push('Account is required') : arrError.push('Account must more than 5 characters');
      }
      if(form.controls.email.errors) {
        form.controls.email.hasError('required') ? arrError.push('Email is required') : arrError.push('Email not match pattern');
      }
      if(form.controls.password.errors) {
        form.controls.password.hasError('required') ? arrError.push('Password is required') : arrError.push('Password must more than 5 characters');
      }
      if(form.controls.phone.errors) {
        form.controls.phone.hasError('required') ? arrError.push('Phone is required') : arrError.push('Phone must minimum 10 number and maximum 11 number');
      } 
      this.dialog.open(AlertDialog, {
        data: {
          title: 'Errors validate form',
          content: arrError,
          isError: true
        },
        minWidth: '30%'
      })     
      return;
    }
    this._auth.register(form.value).subscribe(
      res => {
        this._snackBar.open('Register account successfully', '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,  
          duration: this.durationInSeconds * 1000,
          panelClass: ['snackbar__custom--success']       
        });
        this.router.navigateByUrl('/auth/login')
      },
      err => {
        this.dialog.open(AlertDialog, {
          data: {
            title: 'Register Unsuccessfully',
            content: err,
            isError: true
          },
          minWidth: '30%'
        })    
      }
    );
  }
}
