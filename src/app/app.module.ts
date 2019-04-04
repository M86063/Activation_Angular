import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterDirective } from './done/counter.directive';
import { DoneComponent } from './done/done.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthService } from './shared/auth.service';
import { LoadingComponent } from './shared/loading/loading.component';
import { SharedModule } from './shared/shared.module';
import { StatusComponent } from './status/status.component';
import { WifiComponent } from './wifi/wifi.component';
import { SessionService } from './shared/session/session.service';
import { ServicedownComponent } from './servicedown/servicedown.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StatusComponent,
    WifiComponent,
    DoneComponent,
    LoadingComponent,
    PageNotFoundComponent,
    CounterDirective,
    ServicedownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    NgbModule,
    SharedModule
  ],
  providers: [
    AuthService,
    NgbActiveModal,
    SessionService
  ],
  bootstrap: [AppComponent],
  entryComponents: [WifiComponent]
})
export class AppModule { }
