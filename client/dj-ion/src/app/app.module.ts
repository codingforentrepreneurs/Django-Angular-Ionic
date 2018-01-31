import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';


//Third party 
import { CookieService } from 'ngx-cookie-service';




import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';



import { AuthComponent } from './auth/auth.component';
import { AuthAPIService } from './auth/auth.service';
import { AuthLogoutComponent } from './auth-logout/auth-logout.component';
import { StatusComponent } from './status/status.component';
import { StatusAPIService } from './status/status.service';
import { StatusDetailComponent } from './status-detail/status-detail.component';
import { StatusCreateComponent } from './status-create/status-create.component';
import { TokenInterceptor } from './auth/token.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    StatusDetailComponent,
    StatusCreateComponent,
    AuthComponent,
    AuthLogoutComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthAPIService,
    CookieService,
    StatusAPIService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
