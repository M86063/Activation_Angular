import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Session } from '../types';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private $session: BehaviorSubject<Session> = new BehaviorSubject(null);

  public get session(): Observable<Session> {
    return this.$session.asObservable();
  }

  public updateSession(session: Session | null): void {
    if (session === null) {
      this.$session.next(null);
    } else {
      this.$session.next(this.convertToSession(session));
    }
  }

  private convertToSession(raw: any): Session {
    return {
      accessnet: raw.accessnet || null,
      activecomputer: raw.activecomputer || null,
      finallink: raw.finallink,
      newcustomer: raw.newcustomer || null,
      next: raw.next,
      session: raw.session,
      siteconfig: (raw.siteconfig ? raw.siteconfig : raw.siteConfig) || null,
      youseeScope: raw.youseeScope,
      smpaccessnet: raw.smpaccessnet || null,
      smpservices: raw.smpservices || null,
      subscriber: raw.subscriber
    };
  }

  getSessionstring(): string {
    const session = this.$session.value;
    if (session) {
      return session.session;
    }
  }
}
