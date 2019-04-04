import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div *ngIf="isLoading" class="loading-wrapper">
      <span style="margin: 10px">
        <img [src]="animation" (error)="fallbackAnimation($event)" />
        Indlæser, vent venligst
      </span>
    </div>
  `,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input()
  isLoading: boolean;

  @Input()
  animation: string;

  constructor() {}

  ngOnInit() {}

  public fallbackAnimation(event: any) {
    event.target.src = '../.../../assets/img/ajax-loader.gif';
  }
}
