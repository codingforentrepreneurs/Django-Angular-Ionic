import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';



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

  createAndUpload(fileItem?:File, extraData?:object):any{
      let apiListEndpoint = `${this.baseUrl}status/`
      const formData: FormData = new FormData(); //?
       let fileName;
      if (extraData) {
        for(let key in extraData){
            // iterate and set other form data
            if (key == 'fileName'){
              fileName = extraData[key]
            }
          formData.append(key, extraData[key])
        }
      }

      if (fileItem){
        if (!fileName){
           fileName = fileItem.name
        }
        formData.append('image', fileItem, fileName);
      }

      const req = new HttpRequest('POST', apiListEndpoint, formData, {
        reportProgress: true // for progress data
      });
      return this.http.request(req)
  }


  create(content?:string, image?:any): Observable<any>{
      let apiListEndpoint = `${this.baseUrl}status/` // http://127.0.0.1:8000/api/status/ 
      let data = {
          'content': content
      }
      return this.http.post(apiListEndpoint, data)
  }

  update(statusItem:Status): Observable<any>{
      let apiListEndpoint = `${this.baseUrl}status/${statusItem.id}/` // http://127.0.0.1:8000/api/status/ 
      return this.http.put(apiListEndpoint, statusItem)
  }

  get(id?: number): Observable<Status>{
      if (!id){
          id = 10
      }
      let apiDetailEndpoint = `${this.baseUrl}status/${id}/`
      return this.http.get<Status>(apiDetailEndpoint)
  }
}
