import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
    results = [{
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
  constructor() { }

  ngOnInit() {
  }

}
