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
import { JwtService } from 'src/app/core/services/jwt.service';
import { Profile } from 'src/app/core/models/profile';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 1;

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _jwt: JwtService
  ) { }

  ngOnInit(): void {
    if(this._auth.isAuthenticated()) {
      this.router.navigateByUrl('/soft-ui-dashboard/pages/dashboard')
    }

    this.formLogin = this.fb.group({
      account: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmitted() {
    let form = this.formLogin;    
    if(form.invalid) {
      let arrError = [];
      if(form.controls.account.errors) {
        form.controls.account.hasError('required') ? arrError.push('Account is required') : arrError.push('Account must more than 5 characters');
      }     
      if(form.controls.password.errors) {
        form.controls.password.hasError('required') ? arrError.push('Password is required') : arrError.push('Password must more than 5 characters');
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
    this._auth.login(form.value).subscribe(
      res => {
        this._jwt.setToken(res.data);
        this._auth.profile().subscribe(
          (res: Profile) => {
            this._snackBar.open('Login account successfully', '', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,  
              duration: this.durationInSeconds * 1000,
              panelClass: ['snackbar__custom--success']       
            });
            this.router.navigateByUrl('/soft-ui-dashboard/pages/dashboard')
          },
        )
      },
      err => {
        this.dialog.open(AlertDialog, {
          data: {
            title: 'Login Unsuccessfully',
            content: err,
            isError: true
          },
          minWidth: '30%'
        })    
      }
    )
  }
}
