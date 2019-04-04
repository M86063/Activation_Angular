import { AuthGuard } from './shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoneComponent } from './done/done.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StatusComponent } from './status/status.component';
import { ServicedownComponent } from './servicedown/servicedown.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'servicedown', component: ServicedownComponent },
  { path: 'status', component: StatusComponent, canActivate: [AuthGuard] },
  {
    path: 'signal',
    loadChildren: './signal/signal.module#SignalModule',
    canActivate: [AuthGuard]
  },
  { path: 'done', component: DoneComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
