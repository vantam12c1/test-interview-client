import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from 'src/app/shared/shared.module';
import { UserPage } from '../../pages/user/user.page';
import { UserEditDialog } from '../../pages/user/dialogs/user-edit/user-edit.dialog';

const routes: Routes = [
  {
    path: '',
    component: UserPage
  }
]

@NgModule({
  declarations: [
    UserPage,
    UserEditDialog,  
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],  
})
export class UserModule { }
