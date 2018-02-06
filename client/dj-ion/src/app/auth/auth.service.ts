import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs/Observable';
import { of } from  'rxjs/observable/of';
import { catchError, map, tap } from  'rxjs/operators';

import {AuthLoginData} from './auth';
import { User } from './user';



@Injectable()
export class AuthAPIService {
   private baseUrl = 'http://127.0.0.1:8000/api/'
   private nextUrl;

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    ){ }

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

  checkToken(){
    return this.cookieService.check("jwttoken")
  }
  getToken(){
    return this.cookieService.get("jwttoken")
  }
  performLogout(msg?:string){
    this.cookieService.delete('jwttoken', '/')
    this.router.navigate(['/login'])
    // this.deleteUsername()
  }

  getNextUrl(){
    this.route.queryParams.subscribe(params=>{
        if (params['next']){
            this.nextUrl = params['next']
            switch (this.nextUrl) {
              case "/account/delete":
                this.nextUrl = null
                break;
              
              default:
                // code...
                break;
            }
        }
    })
    return this.nextUrl
  }

  setUsername(user:User){
    this.cookieService.set('username', user.username)
  }

  deleteUsername(){
    // fixed off video
    this.cookieService.delete('username')
  }
  getUsername():string{
    return this.cookieService.get('username') || null
  }

  performLogin(token, expires?:Date, msg?:string){
    let expiryDate = null 
    if (expires){
       expiryDate = expires
    }
     this.cookieService.set('jwttoken', token, expiryDate, "/");
     // this.cookieService.set('user', token, expiryDate, "/"); // set(keyName, value, expires, path)
     const nextUrl = this.getNextUrl()
     if (nextUrl){
       this.router.navigate([nextUrl])
     } else {
       this.router.navigate(['/'])
     }
  }

  login(data:AuthLoginData): Observable<any>{
      let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImNmZSIsImV4cCI6MTUxNzQzMDkzNSwiZW1haWwiOiJoZWxsb0B0ZWFtY2ZlLmNvbSIsIm9yaWdfaWF0IjoxNTE3NDMwNjM1fQ.pB6-lE55DBBu0pGv_r85oFaI3OODc69MlAIfno7SM_w'
      let httpOptions = this.createHeaders()
      let apiLoginEndpoint = `${this.baseUrl}auth/` 
      return this.http.post(apiLoginEndpoint, data, httpOptions) // , httpOptions)
  }
  register(data:any): Observable<any>{
      let httpOptions = this.createHeaders()
      let apiRegisterEndpoint = `${this.baseUrl}auth/register` 
      return this.http.post(apiRegisterEndpoint, data, httpOptions)
  }


}
