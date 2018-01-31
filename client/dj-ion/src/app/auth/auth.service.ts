import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import { of } from  'rxjs/observable/of';
import { catchError, map, tap } from  'rxjs/operators';

import {AuthLoginData} from './auth';




@Injectable()
export class AuthAPIService {
   private baseUrl = 'http://127.0.0.1:8000/api/'


  constructor(private http: HttpClient){ }

  createHeaders(token?:string){
    let data = {
         "Content-Type": 'application/json',
    }
    if (token){
      data['Authorization'] = `JWT ${token}`
    }
     let httpOptions = {
          headers: new HttpHeaders(data)
      }
     return httpOptions
  }

  login(data:AuthLoginData): Observable<any>{
      let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImNmZSIsImV4cCI6MTUxNzQzMDkzNSwiZW1haWwiOiJoZWxsb0B0ZWFtY2ZlLmNvbSIsIm9yaWdfaWF0IjoxNTE3NDMwNjM1fQ.pB6-lE55DBBu0pGv_r85oFaI3OODc69MlAIfno7SM_w'
      let httpOptions = this.createHeaders()
      let apiLoginEndpoint = `${this.baseUrl}auth/` 
      return this.http.post(apiLoginEndpoint, data, httpOptions)
  }
  register(data:any): Observable<any>{
      let httpOptions = this.createHeaders()
      let apiRegisterEndpoint = `${this.baseUrl}auth/register` 
      return this.http.post(apiRegisterEndpoint, data, httpOptions)
  }


}
