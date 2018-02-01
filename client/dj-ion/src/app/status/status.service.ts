import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import { of } from  'rxjs/observable/of';
import { catchError, map, tap } from  'rxjs/operators';


import { Status } from './status';




@Injectable()
export class StatusAPIService {

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

  list(): Observable<any>{
      let apiListEndpoint = `${this.baseUrl}status/?ordering=-timestamp` // http://127.0.0.1:8000/api/status/ 
      return this.http.get(apiListEndpoint)
  }

  create(content?:string, image?:any): Observable<any>{
      let apiListEndpoint = `${this.baseUrl}status/` // http://127.0.0.1:8000/api/status/ 
      let data = {
          'content': content
      }
      return this.http.post(apiListEndpoint, data)
  }

  get(id?: number): Observable<Status>{
      if (!id){
          id = 10
      }
      let apiDetailEndpoint = `${this.baseUrl}status/${id}/`
      return this.http.get<Status>(apiDetailEndpoint)
  }
}
