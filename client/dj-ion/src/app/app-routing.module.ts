import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatusComponent } from './status/status.component';
import { StatusCreateComponent } from './status-create/status-create.component';
import { StatusDetailComponent } from './status-detail/status-detail.component';

const routes: Routes = [
    {path: '', redirectTo: '/status', pathMatch: 'full'},
    {path: 'status/create', component: StatusCreateComponent},
    {path: 'status/:id', component: StatusDetailComponent},
    {path: 'status', component: StatusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
