import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { AuthLoginData } from './auth';
import { AuthAPIService } from './auth.service';
import { User } from './user'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
    userData:User;
    loginForm: FormGroup;
    usernameField: FormControl;
    passwordField: FormControl;
    authLoginSub: any;
    loginErrors: any;
    tokenExists = false
    didLogin = false;
  constructor(
    private authAPI: AuthAPIService,
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
      this.tokenExists = this.authAPI.checkToken()

    }


   doLogin(data){
     this.authLoginSub = this.authAPI.login(data).subscribe(data=>{
       this.userData = data as User
       let token = this.userData.token || null
       let date = new Date(data.expires)
       this.authAPI.performLogin(token, date)
       this.didLogin = true
      }, error=>{
        this.loginErrors = error['error']['detail']
      })
   }

   ngOnDestroy(){
    if (this.authLoginSub){
      this.authLoginSub.unsubscribe()
    }
  }

   handleSubmit(event:any, ourLoginDir:NgForm, loginFormGroup:FormGroup){
      event.preventDefault()
      if (ourLoginDir.submitted){
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




