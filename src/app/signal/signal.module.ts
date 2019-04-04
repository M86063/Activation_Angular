import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignalRoutingModule } from './signal-routing.module';
import { TechnicianVisitComponent } from './technician-visit/technician-visit.component';
import { SignalComponent } from './signal.component';
import { SignalErrorComponent } from './signal-error/signal-error.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SignalComponent,
    SignalErrorComponent,
    TechnicianVisitComponent
  ],
  imports: [CommonModule, SharedModule, SignalRoutingModule]
})
export class SignalModule {}
