import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { USER_ENDPOINT } from 'src/app/core/enums/endpoints.enum';
import { User } from 'src/app/core/models/user';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  arrUser: User[];

  constructor(private _api: ApiService) { }

  get(): Observable<User> {
    return this._api.get(USER_ENDPOINT.USER).pipe(
      map(res => {      
        this.user = new User(res.data)
        return this.user;
      })
    )
  }

  getList(): Observable<User[]> {
    return this._api.get(USER_ENDPOINT.USER).pipe(
      map(res => {
        this.arrUser = res.data.map(item => new User(item)); 
        return this.arrUser;
      })
    )
  }

  edit(id, form) {
    return this._api.put(USER_ENDPOINT.USER, id, form).pipe(
      map(res => {
        this.user = new User(res.data)
        return this.user;
      })
    )
  }

  delete(id) {
    return this._api.delete(USER_ENDPOINT.USER, id)
  }
}
