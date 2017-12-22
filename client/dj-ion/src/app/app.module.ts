import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StatusComponent } from './status/status.component';
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
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
