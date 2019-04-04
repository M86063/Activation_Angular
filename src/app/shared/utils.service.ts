import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() {}

  showError = new Subject<string | null>();

  public updateError(errorMessage: string) {
    this.showError.next(errorMessage);
  }

  public clearError() {
    this.showError.next(null);
  }
}
