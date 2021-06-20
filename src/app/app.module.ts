import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RequestInterceptor } from './core/interceptors/request.interceptor';
import { ResponseInterceptor } from './core/interceptors/response.interceptor';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'soft-ui-dashboard',
    pathMatch: 'full'
  },
  {
    path: 'soft-ui-dashboard',
    loadChildren: () => import(`./layouts/admin-layout/admin-layout.module`).then(m => m.AdminLayoutModule)
  },
  {
    path: 'auth',
    loadChildren: () => import(`./layouts/auth-layout/auth-layout.module`).then(m => m.AuthLayoutModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
