import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Self,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { untilDestroyed } from '@module/utils/common';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { take } from 'rxjs/operators';
import { ViewRefreshService } from '../view-refresh/view-refresh.service';
import * as $ from 'jquery';
export type CloseReason = 'UserClosing' | 'ModalClosing';

export interface ModalClosingEventArgs {
  closeReason: CloseReason;
  cancel: boolean;
}

@Component({
  selector: 'mnu-modal',
  templateUrl: './modal.component.html',
  providers: [ViewRefreshService],
})
export class ModalComponent implements OnInit, OnDestroy {
  @ViewChild(ModalDirective, { static: true })
  private modal!: ModalDirective;

  @ViewChild('body', { static: true })
  private body!: ElementRef<HTMLDivElement>;

  @ContentChild('bodyTemplate', { static: true })
  bodyTemplate!: TemplateRef<any> | null;

  @ContentChild('footerTemplate', { static: true })
  footerTemplate: TemplateRef<unknown> | undefined;

  @ContentChild('contentTemplate', { static: true })
  contentTemplate!: TemplateRef<any> | null;

  @Output()
  beforeClose = new EventEmitter<ModalClosingEventArgs>();

  @Output()
  closing = new EventEmitter<ModalComponent>();

  @Output()
  closed = new EventEmitter<ModalComponent>();

  @Output()
  opening = new EventEmitter<ModalComponent>();

  @Output()
  opened = new EventEmitter<ModalComponent>();

  @Input()
  headerText = '';

  @Input()
  closeButton = true;

  @Input()
  closeEsc = true;

  @Input()
  dialogClass = 'modal-md';

  @Input()
  bodyClass = '';

  constructor(@Self() private viewRefreshService: ViewRefreshService) {}

  ngOnInit(): void {
    this.modal.onShow.pipe(untilDestroyed(this)).subscribe(() => {
      this.viewRefreshService.refresh(300);
      this.opening.emit(this);
    });

    this.modal.onShown
      .pipe(untilDestroyed(this))
      .subscribe(() => this.opened.emit(this));

    this.modal.onHide.pipe(untilDestroyed(this)).subscribe(() => {
      this.scrollTop();
      this.closing.emit(this);
    });

    this.modal.onHidden
      .pipe(untilDestroyed(this))
      .subscribe(() => this.closed.emit(this));
  }

  ngOnDestroy(): void {}

  isOpen(): boolean {
    return this.modal.isShown;
  }

  open(): Promise<void> {
    return new Promise<void>((resolve) => {
      if (this.isOpen()) return;
      this.modal.onShown
        .pipe(take(1), untilDestroyed(this))
        .subscribe(() => resolve());
      this.modal.show();
    });
  }

  close(closeReason: CloseReason = 'ModalClosing'): Promise<void> {
    return new Promise<void>((resolve) => {
      if (!this.isOpen()) return;
      if (!this.canClose(closeReason)) return;
      this.modal.onHidden
        .pipe(take(1), untilDestroyed(this))
        .subscribe(() => resolve());
      this.modal.hide();
    });
  }

  onCloseClick(event: Event): void {
    event.preventDefault();
    if (!this.closeButton) return;
    this.close('UserClosing');
  }

  onEscKeyDown(event: any): void {
    const eventKeyBoard = event as KeyboardEvent;
    eventKeyBoard.preventDefault();
    eventKeyBoard.stopPropagation();
    if (!this.closeEsc) return;
    this.close('UserClosing');
  }

  private canClose(closeReason: CloseReason): boolean {
    const eventArgs: ModalClosingEventArgs = { closeReason, cancel: false };
    this.beforeClose.emit(eventArgs);
    return !eventArgs.cancel;
  }

  private scrollTop(): void {
    const $body = $(this.body.nativeElement);
    if ($body.scrollTop()) {
      $body.scrollTop(0);
    }
  }
}
