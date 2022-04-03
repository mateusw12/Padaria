import { Injectable, OnDestroy } from '@angular/core';
import { untilDestroyed } from '@module/utils/common';
import { Observable, Subject, timer } from 'rxjs';
import { delayWhen, mapTo } from 'rxjs/operators';

@Injectable()
export class ViewRefreshService implements OnDestroy {

  private triggerHandler = new Subject<number>();
  private eventHandler = new Subject<void>();

  constructor() {
    this.triggerHandler.pipe(
      delayWhen(delay => timer(delay)),
      mapTo(void 0),
      untilDestroyed(this)
    ).subscribe(this.eventHandler);
  }

  get onRefresh(): Observable<void> {
    return this.eventHandler.asObservable();
  }

  refresh(delay = 0): void {
    this.triggerHandler.next(delay);
  }

  ngOnDestroy(): void { }

}
