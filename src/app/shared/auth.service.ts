import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError, of, Observable } from 'rxjs';
import { catchError, retry, tap, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TechnicianOrder } from './../signal/technician-visit/technician-visit.component';
import { SessionService } from './session/session.service';
import { Session, User, Wifi } from './types';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private sessionService: SessionService,
    private readonly utilsService: UtilsService
  ) {
    this.sessionService.session.subscribe(
      session => (this.youseeSession = session)
    );
  }
  private localStorage = 'Activation';
  private youseeSession: Session;

  orderTechnician(order: TechnicianOrder) {
    const url = 'activation/signal/' + this.youseeSession.session;
    this.http.put<Session>(url, order.phone).subscribe(
      session => {
        this.sessionService.updateSession(session);
        this.router.navigate(['/' + this.youseeSession.next.site]);
      },
      (error: HttpErrorResponse) => {
        this.utilsService.updateError(error.statusText);
      }
    );
  }

  // updates the wifi credentials
  saveWiFi(wifi: Wifi, session: string) {
    const url = 'activation/WiFi/' + session;

    return this.http
      .put<Session>(url, wifi)
      .pipe(
        retry(1),
        catchError(error => this.handleError(error))
      )
      .subscribe(data => {
        this.sessionService.updateSession(data);
      });
  }

  autoLogin() {
    if (!environment.production) {
      mockSession()
        .pipe(tap(data => this.sessionService.updateSession(data as any)))
        .subscribe(() => {
          this.router.navigate([
            '/' + this.youseeSession.next.site.toLocaleLowerCase()
          ]);
        });
      return;
    }

    const url = 'activation/login';
    this.http
      .post<Session>(url, null)
      .pipe(
        retry(1),
        catchError(error => this.handleLoginError(error))
      )
      .subscribe(data => {
        if (data) {
          this.sessionService.updateSession(data);
          this.router.navigate([
            '/' + this.youseeSession.next.site.toLowerCase()
          ]);
        } else {
          this.sessionService.updateSession(null);
          this.router.navigate(['/servicedown']);
        }
      });
  }

  public login(user: User, callback: (r: boolean) => any) {
    // testing
    if (!environment.production) {
      mockSession()
        .pipe(tap(data => this.sessionService.updateSession(data as any)))
        .subscribe(() => {
          this.router.navigate([
            '/' + this.youseeSession.next.site.toLocaleLowerCase()
          ]);
        });
      return;
      // production
    } else {
      if (this.youseeSession) {
        const url = 'activation/login/' + this.youseeSession.session;
        this.http
          .post<any>(url, user)
          .pipe(
            retry(1),
            catchError(error => this.handleLoginError(error))
          )
          .subscribe(data => {
            if (data) {
              this.sessionService.updateSession(data);
            }
            if (data.next.site === 'LOGIN') {
              callback(false);
            } else {
              this.router.navigate([
                '/' + this.youseeSession.next.site.toLowerCase()
              ]);
            }
          });
      } else {
        this.autoLogin();
      }
    }
  }

  done() {
    if (!environment.production) {
      return mockSession().pipe(
        tap(data => this.sessionService.updateSession(data))
      );
    }

    const sessionString = this.sessionService.getSessionstring();

    return this.http
      .post<Session>(`activation/done/${sessionString}`, null)
      .pipe(
        tap(data => this.sessionService.updateSession(data)),
        catchError(error => this.handleError(error))
      );
  }

  status() {
    if (!environment.production) {
      return mockSession().pipe(
        tap(data => this.sessionService.updateSession(data)),
        catchError(error => this.handleError(error))
      );
    }

    const sessionString = this.sessionService.getSessionstring();

    return this.http.get<Session>(`activation/status/${sessionString}`).pipe(
      tap(data => this.sessionService.updateSession(data)),
      catchError(error => this.handleError(error))
    );
  }

  isLoggedIn() {
    return !!this.youseeSession;
  }

  getToken() {
    if (window.localStorage.getItem(this.localStorage)) {
      return window.localStorage.getItem(this.localStorage);
    } else {
      return '';
    }
  }

  handleLoginError(error) {
    let errorMessage = '';
    this.sessionService.updateSession(null);
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status === 401) {
      // server-side error
      errorMessage =
        'Der er opstået en fejl, kontroller brugernavn og adgangskode og prøv igen. Eller kontakt din bredbåndsudbyder.';
    } else if (error.status === 400) {
      errorMessage =
        'Det angivne Brugernavn/Kundenummer kan ikke bruges til at aktivere bredbånd.';
    } else if (error.status === 409) {
      errorMessage = 'Fejl i forbindelse med operttelse af login';
    } else {
      errorMessage = 'Der er opstået en fejl, prøv igen senere.';
    }

    this.utilsService.updateError(errorMessage);
    return throwError(errorMessage);
  }

  handleError(error) {
    let errorMessage = '';
    this.sessionService.updateSession(null);
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = 'Der er opstået en fejl, prøv igen senere.';
    }
    this.utilsService.updateError(errorMessage);
    return throwError(errorMessage);
  }
}

// todo: remove when backend integration is available.
function mockSession(): Observable<Session> {
  const session = {
    session: '9532a355-f917-4ed7-ba50-d55d67c32894',
    youseeScope: true,
    finallink: 'Https://www.fastspeed.dk/aktivering',
    subscriber: {
      subscriber: 'CU091810971',
      firstName: 'Arbejdsabonnement',
      lastName: 'Tdc Lokation',
      email: 'lars.oestergaard@gmail.com',
      address1: 'Sletvej 30',
      postnummer: '8310',
      city: 'Tranbjerg J',
      postdistrict: 'Aarhus'
    },
    siteconfig: {
      isp: 'YouSee',
      stylesheet: 'css/Hiper/Hiper.css',
      phone: '40 30 75 95',
      stylesheetIE: 'css/Hiper/Hiper                  -IE.css'
    },
    smpaccessnet: [
      {
        type: 'CableModem',
        macAddress: '24:7f:20:0b:1e:7d',
        model: 'FAST3890V2',
        capabilities: {
          model: 'FAST3890V2',
          oidssid: '1.3.6.1.4.1.4413.2.2.2.1.18.1.2.1.1.3.10001',
          oidssid5g: '1.3.6.1.4.1.4413.2.2.2.1.18.1.2.1.1.3.10101',
          oidpsk: '1.3.6.1.4.1.4413.2.2.2.1.18.1.2.3.4.1.2.10001',
          oidpsk5g: '1.3.6.1.4.1.4413.2.2.2.1.18.1.2.3.4.1.2.10101',
          WiFi5GChannels: ['0', '36', '40', '44', '48'],
          WiFiChannels: [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13'
          ],
          WiFi5G: true,
          Docsis3: true,
          WiFi: true,
          Voice: true,
          CMTemplate: true,
          Preloaded: 'Y',
          FactoryResetOID: '1.3.6.1.4.1.4413.2.2.2.1.2.1.6.0',
          truth_value: '1',
          reboot_time_first_provisioning: '300',
          system_description: '1.3.6.1.2.1.1.1.0',
          system_name: '1.3.6.1.2.1.1.5.0',
          mta_fqdn: '1.3.6.1.4.1.4491.2.2.1.1.1.5.0',
          mta_mac: '1.3.6.1.4.1.4491.2.2.1.1.1.4.0',
          oidbts: '1.3.6.1.4.1.4491.2.2.1.1.1.9.0',
          oidstatus: '1.3.6.1.4.1.4413.2.2.2.1.6.5.1.1.1',
          oidprov: '1.3.6.1.4.1.4491.2.2.2.1.2.1.1.26.9',
          act_portal_system_name: 'FAST3890V2',
          mac_offset: '3'
        },
        ip: '10.97.4.2'
      },
      {
        cpeType: 'StdCpe',
        type: 'Computer'
      }
    ],
    smpservices: [
      {
        type: 'WiFi',
        ssid: 'Test1',
        channel: '12',
        ss_id_5g: 'Test1_5GHz',
        gw_channel_id_5g: '36'
      },
      {
        type: 'InternetAccess',
        status: 'active',
        product: 'BB 150 Mbit / 30 Mbit',
        modemId: 'C2953791',
        ssid: 'Test1',
        channel: '12',
        ss_id_5g: 'Test1_5GHz',
        channel_5g: '36',
        next: {
          site: 'InternetAccess',
          uri:
            '/activation/api/InternetAccess/9532a355-f917-4ed7-ba50-d55d67c32894',
          http: 'PUT'
        }
      },
      {
        type: 'Foreningsmail',
        name: 'foreningsmail.dk',
        next: {
          site: 'Foreningsmail',
          uri:
            '/activation/api/Foreningsmail/9532a355-f917-4ed7-ba50-d55d67c32894',
          http: 'PUT'
        }
      }
    ],
    accessnet: [
      {
        type: 'WiFi',
        ssid: '2.4G network name',
        channel: '0',
        ss_id_5g: '5G network name',
        gw_channel_id_5g: '0'
      },
      {
        deviceType: 'CableModem',
        macAddress: '24:7f:20:0b:1e:7d',
        ip: '10.97.4.2',
        model: 'FAST3890V2',
        capabilities: {
          model: 'FAST3890V2',
          oidssid: '1.3.6.1.4.1.4413.2.2.2.1.18.1.2.1.1.3.10001',
          oidssid5g: '1.3.6.1.4.1.4413.2.2.2.1.18.1.2.1.1.3.10101',
          oidpsk: '1.3.6.1.4.1.4413.2.2.2.1.18.1.2.3.4.1.2.10001',
          oidpsk5g: '1.3.6.1.4.1.4413.2.2.2.1.18.1.2.3.4.1.2.10101',
          WiFi5GChannels: ['0', '36', '40', '44', '48'],
          WiFiChannels: [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13'
          ],
          WiFi5G: true,
          Docsis3: true,
          WiFi: true,
          Voice: true,
          CMTemplate: true,
          Preloaded: 'Y',
          FactoryResetOID: '1.3.6.1.4.1.4413.2.2.2.1.2.1.6.0',
          truth_value: '1',
          reboot_time_first_provisioning: '300',
          system_description: '1.3.6.1.2.1.1.1.0',
          system_name: '1.3.6.1.2.1.1.5.0',
          mta_fqdn: '1.3.6.1.4.1.4491.2.2.1.1.1.5.0',
          mta_mac: '1.3.6.1.4.1.4491.2.2.1.1.1.4.0',
          oidbts: '1.3.6.1.4.1.4491.2.2.1.1.1.9.0',
          oidstatus: '1.3.6.1.4.1.4413.2.2.2.1.6.5.1.1.1',
          oidprov: '1.3.6.1.4.1.4491.2.2.2.1.2.1.1.26.9',
          act_portal_system_name: 'FAST3890V2',
          mac_offset: '3'
        }
      },
      {
        type: 'Telefoni',
        telefonNummer: '48413876',
        cnam: 'ATT. LARS ØST Y'
      },
      {
        type: 'TdcMail',
        next: {
          site: 'TdcMail',
          uri: '/activation/api/TdcMail/78723d94-0607-4312-92ef-bac4582bd5a0',
          http: 'PUT'
        }
      },
      {
        type: 'Foreningsmail',
        name: 'YouSee Test',
        next: {
          site: 'Foreningsmail',
          uri:
            '/activation/api/Foreningsmail/78723d94-0607-4312-92ef-bac4582bd5a0',
          http: 'PUT'
        }
      },
      {
        type: 'Foreningsmail',
        name: 'turbopost.dk',
        next: {
          site: 'Foreningsmail',
          uri:
            '/activation/api/Foreningsmail/78723d94-0607-4312-92ef-bac4582bd5a0',
          http: 'PUT'
        }
      }
    ],
    activecomputer: {
      deviceType: 'Computer',
      macAddress: '24:7f:20:0b:1e:7f',
      ip: '62.135.136.226',
      giAddress: '10.97.4.1',
      docsis3Capable: false,
      wifiCapable: true,
      ownerid: 'C2953791',
      links: [
        {
          rel: 'self',
          href:
            'HTTP/1.1://tossi.yousee.tv/accessnet/api/v1/accessnet/devices/24:7f:20:0b:1e:7f',
          method: 'GET'
        },
        {
          rel: 'subscriber',
          href:
            'HTTP/1.1://tossi.yousee.tv/accessnet/subscriber/api/v1/subscriber?cpemac=247f200b1e7f',
          method: 'GET'
        },
        {
          rel: 'ip-address',
          href: 'HTTP/1.1://tossi.yousee.tv/accessnet/ip/24:7f:20:0b:1e:7f',
          method: 'GET'
        }
      ]
    },
    newcustomer: {
      mail: false,
      mobil: false,
      password: false,
      next: {
        site: 'login',
        uri: '/activation/api/login/9532a355-f917-4ed7-ba50-d55d67c32894',
        http: 'PUT'
      }
    },
    next: {
      site: 'STATUS',
      uri: '/activation/api/done/9532a355-f917-4ed7-ba50-d55d67c32894',
      http: 'POST'
    }
  };

  return of(session).pipe(delay(3000)) as any;
}

function mockSessionError(): Observable<Error> {
  const session = {
    status: 'Service is down',
    message: 'Error while calling snmp from accessnet for ip 10.97.5.4'
  };
  return of(session).pipe(delay(1000)) as any;
}
