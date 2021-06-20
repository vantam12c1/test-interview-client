import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { AdminLayoutComponent } from './admin-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthGuard } from 'src/app/modules/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full'
  },
  {
    path: 'pages',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../../modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'news',
        loadChildren: () => import('../../modules/news/news.module').then(m => m.NewsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'user',
        loadChildren: () => import('../../modules/user/user.module').then(m => m.UserModule),
        canActivate: [AuthGuard]
      }
    ]
  }
]

@NgModule({
  declarations: [
    AdminLayoutComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminLayoutModule { }
