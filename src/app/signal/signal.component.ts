import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from '../shared/session/session.service';
import { Session } from '../shared/types';

@Component({
  selector: 'app-signal',
  templateUrl: './signal.component.html',
  styleUrls: ['./signal.component.scss']
})
export class SignalComponent implements OnInit {
  public $session: Observable<Session>;
  constructor(private readonly sessionService: SessionService) {}

  ngOnInit() {
    this.$session = this.sessionService.session;
  }
}
