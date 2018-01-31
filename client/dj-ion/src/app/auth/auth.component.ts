import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


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
    loginForm: FormGroup;
    usernameField: FormControl;
    passwordField: FormControl;
    tokenExists = false
  constructor(
    private authAPI: AuthAPIService,
    private cookieService: CookieService,
    private router: Router,
    ) { }

  ngOnInit() {
      this.usernameField  = new FormControl("", [
                  Validators.required,
                  Validators.minLength(0),
                  Validators.maxLength(280)
             ])
      this.passwordField  = new FormControl("", [
                  Validators.required,
                  Validators.minLength(4),
                  Validators.maxLength(280)
             ])
      this.loginForm = new FormGroup({
          'usernameField': this.usernameField,
          'passwordField': this.passwordField
      })
      this.tokenExists = this.cookieService.check('jwttoken')

    }


   doLogin(data){
     this.authAPI.login(data).subscribe(data=>{
       this.userData = data as User
       let token = this.userData.token || null
       let date = new Date(data.expires)
       this.cookieService.set('jwttoken', token, date, "/"); // set(keyName, value, expires, path)
        this.router.navigate(['/'])
      })
   }

   handleSubmit(event:any, ourLoginDir:NgForm, loginFormGroup:FormGroup){
      event.preventDefault()
      if (ourLoginDir.submitted){
          console.log(loginFormGroup.value)
          // interact with the server
          let authLoginData = new AuthLoginData(
              loginFormGroup.value['usernameField'], 
              loginFormGroup.value['passwordField']
              )
          this.doLogin(authLoginData)
          ourLoginDir.resetForm({})
      }
  }

}




