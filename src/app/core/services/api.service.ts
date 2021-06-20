import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import * as URL from '../utils/url';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(endpoint, data: any = {}): Observable<any> {
    return this.http.get(URL.merge(environment.URL_API, endpoint, URL.query(data)));
  }

  post(endpoint, data: any = {}, options?: any): Observable<any>{
    let optionHeaders = {
      headers: new HttpHeaders({
        'Content-Type': options ? options : 'application/json' 
      })
    }
    return this.http.post(URL.merge(environment.URL_API, endpoint), data, optionHeaders)
  }

  put(endpoint, id, data: any = {}, options?: any): Observable<any> {
    let optionHeaders = {
      headers: new HttpHeaders({
        'Content-Type': options ? options : 'application/json' 
      })
    }
    return this.http.put(URL.merge(environment.URL_API, endpoint, URL.query(id)), data, optionHeaders)
  }

  delete(endpoint, id): Observable<any> {
    return this.http.delete(URL.merge(environment.URL_API, endpoint, URL.query(id)))
  }
}
