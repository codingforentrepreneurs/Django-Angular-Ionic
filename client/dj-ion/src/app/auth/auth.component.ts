import { Component, OnInit } from '@angular/core';


import { AuthLoginData } from './auth';
import {AuthAPIService } from './auth.service';
import { User } from './user'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    userData:User;
    username: string;
  constructor(private authAPI: AuthAPIService) { }

  ngOnInit() {
      // let data = {username: "cfe", password: "endlesscoder"}
      let authLoginData = new AuthLoginData("cfe", "endlesscoder")
      this.doLogin(authLoginData)
    }
   doLogin(data){
     this.authAPI.login(data).subscribe(data=>{
       this.userData = data as User
      })
 }
}
