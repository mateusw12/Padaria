import {
  AfterViewInit,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { OnPropertyChange, PropertyChanges } from '@module/utils/common';
import { Delegate } from '@module/utils/internal';

@Injectable()
export abstract class TextBoxBase implements AfterViewInit {
  private initialized = false;
  private iconElement: HTMLSpanElement | undefined;
  private unlistenClickEvent: Delegate | undefined;
  private groupElement!: HTMLDivElement;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  @Input()
  iconClass: string = '';

  @Output()
  iconClick = new EventEmitter<MouseEvent>();

  ngAfterViewInit(): void {
    this.initialize();
    this.renderIcon();
  }

  private initialize(): void {
    this.groupElement = this.elementRef.nativeElement
      .firstElementChild as HTMLDivElement;
    if (!this.groupElement) return;
    this.renderer.addClass(this.groupElement, 'e-input-group');
    this.initialized = true;
  }

  private removeIconElement(): void {
    if (!this.iconElement) return;
    this.renderer.removeChild(this.groupElement, this.iconElement);
    this.iconElement = undefined;
    if (!this.unlistenClickEvent) return;
    this.unlistenClickEvent();
    this.unlistenClickEvent = undefined;
  }

  private createIconElement(): void {
    if (this.iconElement) return;
    this.iconElement = this.renderer.createElement('span') as HTMLSpanElement;
    this.renderer.addClass(this.iconElement, 'e-input-group-icon');
    this.renderer.appendChild(this.groupElement, this.iconElement);
    this.unlistenClickEvent = this.renderer.listen(
      this.iconElement,
      'click',
      (event: MouseEvent) => this.iconClick.emit(event)
    );
  }

  @OnPropertyChange('iconClass')
  private renderIcon(changes?: PropertyChanges): void {
    if (!this.initialized) {
      return;
    }
    if (!this.iconClass) {
      this.removeIconElement();
      return;
    }
    this.createIconElement();
    const classNames = this.iconClass.split(/\s+/g);
    if (changes && changes.iconClass && changes.iconClass.previousValue) {
      const previousIconClass = changes.iconClass.previousValue as string;
      const previousClassNames = previousIconClass.split(/\s+/g);
      for (const className of previousClassNames) {
        if (classNames.some((name) => name === className)) continue;
        this.renderer.removeClass(this.iconElement, className);
      }
    }
    for (const className of classNames) {
      this.renderer.addClass(this.iconElement, className);
    }
  }
}
