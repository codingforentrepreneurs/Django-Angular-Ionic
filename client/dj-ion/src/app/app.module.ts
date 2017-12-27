import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { StatusComponent } from './status/status.component';
import { StatusAPIService } from './status/status.service';
import { StatusDetailComponent } from './status-detail/status-detail.component';
import { StatusCreateComponent } from './status-create/status-create.component';


@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    StatusDetailComponent,
    StatusCreateComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    StatusAPIService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
