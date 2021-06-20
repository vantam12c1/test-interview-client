import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { DashboardPage } from '../../pages/dashboard/dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }
]

@NgModule({
  declarations: [
    DashboardPage
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
