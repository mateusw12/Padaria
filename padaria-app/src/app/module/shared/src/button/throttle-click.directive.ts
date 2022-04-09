import { Directive, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { untilDestroyed } from '@module/utils/common';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[throttleClick]'
})
export class ThrottleClickDirective implements OnInit, OnDestroy {

  private clickEventHandler = new Subject<MouseEvent>();

  @HostBinding('attr.disabled')
  get attrDisabled(): string | null {
    return this.disabled ? '' : null;
  }

  @Input()
  disabled = false;

  @Input()
  throttleTime = 500;

  @Output()
  throttleClick = new EventEmitter<MouseEvent>();

  constructor() { }

  ngOnInit(): void {
    this.clickEventHandler.pipe(
      throttleTime(this.throttleTime),
      untilDestroyed(this)
    ).subscribe(this.throttleClick);
  }

  ngOnDestroy(): void { }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.disabled) return;
    this.clickEventHandler.next(event);
  }

}
