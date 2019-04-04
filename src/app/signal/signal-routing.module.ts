import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignalComponent } from './signal.component';
import { TechnicianVisitComponent } from './technician-visit/technician-visit.component';

const routes: Routes = [
  { path: '', component: SignalComponent },
  { path: 'technician', component: TechnicianVisitComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignalRoutingModule {}
