import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertBlockComponent } from './alert-block/alert-block.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilsService } from './utils.service';
import { SessionService } from './session/session.service';

@NgModule({
  declarations: [AlertBlockComponent],
  exports: [AlertBlockComponent, ReactiveFormsModule],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [UtilsService, SessionService]
})
export class SharedModule { }
