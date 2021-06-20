import { Injectable } from '@angular/core';
import * as COOKIE from '../utils/cookie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  accessToken: string;
  tokenType: string;
  expiresIn: number;

  constructor() { }

  getToken() {
    if(this.hasSavedToken()) {
      return `${this.tokenType} ${this.accessToken}`;
    } else {
      return '';
    }
  }

  setToken(data) {
    this.accessToken = data.access_token;
    this.tokenType = data.token_type;
    this.expiresIn = data.expires_in;
    COOKIE.set(environment.cookiesKey.accessToken, this.accessToken, this.expiresIn);
    COOKIE.set(environment.cookiesKey.tokenType, this.tokenType, this.expiresIn);
  }

  removeToken() {
    COOKIE.remove(environment.cookiesKey.accessToken);
    COOKIE.remove(environment.cookiesKey.tokenType);
  }

  hasSavedToken() {
    this.accessToken = COOKIE.get(environment.cookiesKey.accessToken);
    this.tokenType = COOKIE.get(environment.cookiesKey.tokenType);
    return (this.accessToken && this.tokenType) ? true : false;
  }
}
