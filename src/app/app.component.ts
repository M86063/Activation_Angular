import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SessionService } from './shared/session/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public cssUrl: SafeResourceUrl;
  constructor(
    private sanitizer: DomSanitizer,
    private sessionService: SessionService
  ) { }
  ngOnInit() {
    this.sessionService.session.subscribe(session => {
      this.cssUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(
          session !== null
            ? session.siteconfig.stylesheet
            : 'css/YouSee/YouSee.css'
        ) ||
        this.sanitizer.bypassSecurityTrustResourceUrl('css/YouSee/YouSee.css');
    });
  }
}
