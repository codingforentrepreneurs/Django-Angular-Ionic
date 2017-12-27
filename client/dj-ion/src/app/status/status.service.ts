import { Injectable } from '@angular/core';

@Injectable()
export class StatusAPIService {

  constructor() { }

  list(){
      return [
      {
            "uri": "http://127.0.0.1:8000/api/status/10/",
            "id": 10,
            "user": {
                "id": 1,
                "username": "cfe",
                "uri": "http://127.0.0.1:8000/api/user/cfe/"
            },
            "content": "please delete me",
            "image": "http://127.0.0.1:8000/media/status/cfe/logo_ndfWTYl.jpg"
        },
        {
            "uri": "http://127.0.0.1:8000/api/status/10/",
            "id": 10,
            "user": {
                "id": 1,
                "username": "cfe",
                "uri": "http://127.0.0.1:8000/api/user/cfe/"
            },
            "content": "please delete me",
            "image": "http://127.0.0.1:8000/media/status/cfe/logo_ndfWTYl.jpg"
        },
        {
            "uri": "http://127.0.0.1:8000/api/status/11/",
            "id": 11,
            "user": {
                "id": 1,
                "username": "cfe",
                "uri": "http://127.0.0.1:8000/api/user/cfe/"
            },
            "content": "Some great new content!",
            "image": null
        }]
  }

}
