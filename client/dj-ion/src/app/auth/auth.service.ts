import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import { of } from  'rxjs/observable/of';
import { catchError, map, tap } from  'rxjs/operators';

import {AuthLoginData} from './auth';


const httpOptions = {
    headers: new HttpHeaders({"Content-Type": 'application/json' })

}


@Injectable()
export class AuthAPIService {
   private baseUrl = 'http://127.0.0.1:8000/api/'


  constructor(private http: HttpClient){ }

  login(data:AuthLoginData): Observable<any>{
      let apiLoginEndpoint = `${this.baseUrl}auth/` 
      return this.http.post(apiLoginEndpoint, data, httpOptions)
  }
  register(data:any): Observable<any>{
      let apiRegisterEndpoint = `${this.baseUrl}auth/register` 
      return this.http.post(apiRegisterEndpoint, data, httpOptions)
  }


}
