import { Directive, Input, Output, EventEmitter, OnChanges, OnDestroy, Inject } from '@angular/core';

import { Subject, Observable, SubscriptionLike, timer } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({
  selector: '[appCounter]'
})
export class CounterDirective implements OnChanges, OnDestroy {

  private counter$ = new Subject<any>();
  private countSub$: SubscriptionLike;


  @Input() counter: number;
  @Input() interval: number;
  @Output() whenDone = new EventEmitter();
  @Output() value = new EventEmitter<number>();

  constructor(@Inject(DOCUMENT) private document: any) {

    this.countSub$ = this.counter$.pipe(
      switchMap((options: any) =>
        timer(0, options.interval).pipe(
          take(options.count),
          tap(() => {
            if (options.count === 1) {
              this.whenDone.emit();
            }
            this.value.emit(--options.count)
          })
        )
      )
    ).subscribe();
  }

  ngOnChanges() {
    this.counter$.next({ count: this.counter, interval: this.interval });
  }

  ngOnDestroy() {
    this.countSub$.unsubscribe();
  }

}
