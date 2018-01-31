import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-auth-logout',
  templateUrl: './auth-logout.component.html',
  styleUrls: ['./auth-logout.component.css']
})
export class AuthLogoutComponent implements OnInit {

  constructor(
      private cookieService: CookieService,
      private router: Router,
      ) { }

  ngOnInit() {
      this.cookieService.delete('jwttoken', '/')
      this.router.navigate(['/login'])
  }

}
