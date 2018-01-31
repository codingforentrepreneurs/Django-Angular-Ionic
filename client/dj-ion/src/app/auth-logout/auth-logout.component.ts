import { Component, OnInit } from '@angular/core';
import {AuthAPIService } from '../auth/auth.service';
@Component({
  selector: 'app-auth-logout',
  templateUrl: './auth-logout.component.html',
  styleUrls: ['./auth-logout.component.css']
})
export class AuthLogoutComponent implements OnInit {

  constructor(
      private authAPI: AuthAPIService,
      ) { }

  ngOnInit() {
      this.authAPI.performLogout("You have successfully logged out! Please login again.")
  }

}
