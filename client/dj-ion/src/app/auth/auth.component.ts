import { Component, OnInit } from '@angular/core';

import {AuthAPIService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    authData:any;
  constructor(private authAPI: AuthAPIService) { }

  ngOnInit() {
      let data = {username: "cfe", password: "endlesscoder"}
       this.authAPI.login(data).subscribe(data=>{
            this.authData = data
        })
    }
}
