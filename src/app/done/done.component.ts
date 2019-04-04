import { UtilsService } from 'src/app/shared/utils.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SMPService, Session } from '../shared/types';
import { AuthService } from '../shared/auth.service';
import { DOCUMENT } from '@angular/common';
import { SessionService } from '../shared/session/session.service';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})
export class DoneComponent implements OnInit {
  autoLogin: FormGroup;
  counter = 180;
  interval = 1000;
  errorMessage = '';

  public session$: Observable<Session>;
  public internetSmpService$: Observable<SMPService>;
  public cableModemIp$: Observable<string>;

  counterValue: number;

  constructor(
    private service: AuthService,
    private readonly sessionService: SessionService,
    private util: UtilsService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.util.showError.subscribe(message => {
      this.errorMessage = message;
    });

    this.service.done().subscribe();

    this.session$ = this.sessionService.session.pipe(
      filter(session => session && !!session.smpservices));

    this.internetSmpService$ = this.session$.pipe(
      map(session => {
        return session.smpservices.find(
          smpService => smpService.type === 'InternetAccess'
        );
      }));

    this.cableModemIp$ = this.session$.pipe(
      map(session => {
        if (session.smpaccessnet) {
          const isPresent = session.smpaccessnet.find(
            accessNet => accessNet.type === 'CableModem'
          );

          if (isPresent) {
            return isPresent.ip;
          }
        }

        return '';
      })
    );
  }

  done() {
    this.session$.subscribe(session => {
      this.document.location.href = session.finallink;
    }).unsubscribe();
  }
}
