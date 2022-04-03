import { Directive, EventEmitter, OnDestroy, OnInit, Optional, Output, Self, SkipSelf } from '@angular/core';
import { untilDestroyed } from '@module/utils/common';
import { ViewRefreshService } from './view-refresh.service';

@Directive({
  selector: '[mnuViewRefresh]',
  providers: [ViewRefreshService]
})
export class ViewRefreshDirective implements OnInit, OnDestroy {

  @Output('mnuViewRefresh')
  viewRefresh = new EventEmitter<void>();

  constructor(
    @Self() private hostViewRefreshService: ViewRefreshService,
    @SkipSelf() @Optional() private parentViewRefreshService: ViewRefreshService
  ) { }

  ngOnInit(): void {
    this.registerEvents();
  }

  ngOnDestroy(): void { }

  private registerEvents(): void {
    if (this.parentViewRefreshService) {
      this.parentViewRefreshService.onRefresh
        .pipe(untilDestroyed(this))
        .subscribe(() => this.hostViewRefreshService.refresh());
    }
    this.hostViewRefreshService.onRefresh
      .pipe(untilDestroyed(this))
      .subscribe(() => this.viewRefresh.emit());
  }

  refresh(delay?: number): void {
    this.hostViewRefreshService.refresh(delay);
  }

}
