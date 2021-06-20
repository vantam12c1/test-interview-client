import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { SharedModule } from 'src/app/shared/shared.module';
import { LoginPage } from '../../pages/login/login.page';
import { RegisterPage } from '../../pages/register/register.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'register',
    component: RegisterPage
  }
]

@NgModule({
  declarations: [
    LoginPage,
    RegisterPage,    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MatSnackBarModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
