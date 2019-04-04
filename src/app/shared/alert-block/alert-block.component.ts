import { Component, Input } from '@angular/core';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-alert-block',
  template: `
    <div
      *ngIf="errorMessage"
      class="alert alert-primary alert-dismissible fade show"
      style="display: flex; justify-content: space-between; align-items: center;"
    >
      <p>{{ errorMessage }}</p>
      <button (click)="close()">
        <span>&times;</span>
      </button>
    </div>
  `,
  styleUrls: ['./alert-block.component.scss']
})
export class AlertBlockComponent {
  constructor(private readonly utilsService: UtilsService) {}
  @Input() errorMessage: string;

  public close() {
    this.utilsService.clearError();
  }
}
