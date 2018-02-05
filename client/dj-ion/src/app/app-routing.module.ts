import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { AuthLogoutComponent } from './auth-logout/auth-logout.component'
import { StatusComponent } from './status/status.component';
import { StatusCreateComponent } from './status-create/status-create.component';
import { StatusDetailComponent } from './status-detail/status-detail.component';

const routes: Routes = [
    {path: '', redirectTo: '/status', pathMatch: 'full'},
    {path: 'login', component: AuthComponent},
    {path: 'logout', component: AuthLogoutComponent},
    {path: 'status/create', component: StatusCreateComponent},
    {path: 'status/:id', component: StatusDetailComponent},
    {path: 'status/:id/update', redirectTo: '/status', pathMatch: 'full'},
    {path: 'status', component: StatusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
