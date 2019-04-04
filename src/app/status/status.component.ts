import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';
import { SessionService } from '../shared/session/session.service';
import { WifiComponent } from '../wifi/wifi.component';
import {
  Session,
  SMPService,
  Smpaccessnet,
  Accessnet
} from './../shared/types';
import { UtilsService } from '../shared/utils.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  public session$: Observable<Session>;
  public internetSmpService$: Observable<SMPService>;
  public cableModemIp$: Observable<string>;
  public warning$: Observable<boolean>;
  public showAlertWithMessage: string;

  constructor(
    private router: Router,
    private service: AuthService,
    @Inject(DOCUMENT) private document: any,
    private modalService: NgbModal,
    private readonly sessionService: SessionService,
    private readonly ultilsService: UtilsService
  ) { }

  ngOnInit() {
    this.service.status().subscribe();

    this.ultilsService.showError.subscribe(error => {
      this.showAlertWithMessage = error;
    });

    this.session$ = this.sessionService.session;

    this.internetSmpService$ = this.session$.pipe(
      map(session => {
        if (!session || !session.smpservices) {
          return null;
        }

        return session.smpservices.find(
          smpService => smpService.type === 'InternetAccess'
        );
      }));

    this.cableModemIp$ = this.session$.pipe(
      map(session => {
        if (!session || !session.smpaccessnet) {
          return '';
        }

        const isPresent = session.smpaccessnet.find(
          smpAccessNet => smpAccessNet.type === 'CableModem'
        );

        if (isPresent) {
          return isPresent.ip;
        }
      })
    );

    this.warning$ = this.session$.pipe(
      map(session => this.checkWarning(session))
    );
  }

  checkWarning(session: Session) {
    let warning;
    let smpAccessNet: Smpaccessnet;
    let accessNet: Accessnet;

    if (!session) {
      return false;
    }

    if (!!session.smpaccessnet) {
      smpAccessNet = session.smpaccessnet.find(
        smpaccessnet => smpaccessnet.type === 'CableModem');
    }
    if (!!session.accessnet) {
      accessNet = session.accessnet.find(
        accessnet => accessnet.deviceType === 'CableModem');
    }

    if (smpAccessNet === undefined && accessNet === undefined) {
      warning = true;
    } else {
      warning = false;
    }

    if (
      session.siteconfig.isp === 'YouSee' &&
      session.youseeScope === false
    ) {
      warning = true;
    }
    this.ultilsService.updateError(warning);
    return warning;
  }

  open() {
    this.modalService.open(WifiComponent);
  }

  mitWifiClick() {
    this.document.location.href = 'https://aktiver.mitwifi.dk/';
  }

  nextBtn() {
    this.router.navigate(['/done']);
  }
}
