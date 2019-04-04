import { Component, OnInit, Input } from '@angular/core';
import { SiteConfig } from 'src/app/shared/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signal-error',
  templateUrl: './signal-error.component.html',
  styleUrls: ['./signal-error.component.scss']
})
export class SignalErrorComponent {
  @Input()
  public signalError: boolean;

  @Input()
  public siteConfig: DetailedSiteConfig;

  public pics: { [key: string]: string } = {
    DEFAULT: '../../../assets/img/foerste-stik-i-huset.jpg',
    YouSee: '../../../assets/img/foerste-stik-i-huset-yousee.jpg'
  };

  constructor(private readonly router: Router) {}

  public goToTechnician() {
    this.router.navigate(['signal/technician']);
  }
}

interface DetailedSiteConfig extends SiteConfig {
  mail: string;
  phone: string;
}
