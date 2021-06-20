import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';
import { AUTH_ENDPOINT } from 'src/app/core/enums/endpoints.enum';
import { Profile } from 'src/app/core/models/profile';
import { Observable } from 'rxjs';
import { JwtService } from 'src/app/core/services/jwt.service';
import * as Rx from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$: Rx.BehaviorSubject<Profile> = new Rx.BehaviorSubject<Profile>(null);
  role$: Rx.BehaviorSubject<string> = new Rx.BehaviorSubject<string>('');;
  isLogin: boolean = false;

  constructor(
    private _api: ApiService,
    private _jwt: JwtService
  ) { }

  register(form) {
    return this._api.post(AUTH_ENDPOINT.REGISTER, form).pipe(
      map(res => res)
    )
  }

  login(form) {
    return this._api.post(AUTH_ENDPOINT.LOGIN, form).pipe(
      map(res => res)
    )
  }

  logout(): Observable<any> {
    return this._api.post(AUTH_ENDPOINT.LOGOUT, {}).pipe(
      map(res => {
        this.currentUser$.next(null);        
        this.isLogin = false;       
        return res;
      })
    )
  }

  profile(): Observable<Profile> {
    return this._api.get(AUTH_ENDPOINT.PROFILE).pipe(
      map(res => {                  
        this.isLogin = true;
        this.role$.next(res.data.role)
        this.currentUser$.next(new Profile(res.data));       
        return res;
      })
    )
  }

  isAuthenticated() {
    if(this.isLogin) return true;   
    if(this._jwt.hasSavedToken()) {          
      this.profile().subscribe();      
      return true;
    } else {
      return false;
    }
  }
}
