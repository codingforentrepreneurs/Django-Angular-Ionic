import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import { of } from  'rxjs/observable/of';
import { catchError, map, tap } from  'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({"ContentType": 'application/json' })

}


@Injectable()
export class StatusAPIService {

   private baseUrl = 'http://127.0.0.1:8000/api/'


  constructor(private http: HttpClient){ }

  list(): Observable<any>{
      let apiListEndpoint = `${this.baseUrl}status/` // http://127.0.0.1:8000/api/status/ 
      return this.http.get(apiListEndpoint)
  }

  get(id?: number): Observable<any>{
      if (!id){
          id = 10
      }
      let apiDetailEndpoint = `${this.baseUrl}status/${id}/`
      return this.http.get(apiDetailEndpoint)
  }
}
