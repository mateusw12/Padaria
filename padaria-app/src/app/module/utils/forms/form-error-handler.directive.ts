import {
  ComponentFactoryResolver,
  Directive,
  DoCheck,
  ElementRef,
  Host,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  Self,
  ViewContainerRef
} from '@angular/core';
import { AbstractControl, AbstractControlDirective, ControlContainer, NgControl } from '@angular/forms';
import { merge, Observable, Subject } from 'rxjs';
import { untilDestroyed } from '../common';
import { FormError, getErrorMessage } from './form-error-accessor';
import { FormErrorContainer } from './form-error-container.component';
import { FormErrorContainerDirective } from './form-error-container.directive';
import { parseErrorInfo } from './form-error-info';
import { FormErrorControl } from './form-error.component';

const SUCCESS = 'e-success';
const ERROR = 'e-error';

@Directive({
  selector: '[formErrorHandler]'
})
export class FormErrorHandlerDirective implements OnInit, DoCheck, OnDestroy {

  private statusChange = new Subject<unknown>();
  private valid: boolean | null = null;
  private touched: boolean | null = null;
  private container: ControlContainer;
  private control: NgControl | null;
  private elementRef: ElementRef<HTMLElement>;
  private renderer: Renderer2;
  private errorControl: FormErrorControl | undefined;

  get path(): string[] {
    return (this.control ? this.control.path : this.container.path) || [];
  }

  get target(): AbstractControlDirective {
    return this.control ? this.control : this.container;
  }

  @Input()
  errorContainer: FormErrorContainer;

  constructor(
    @Host() container: ControlContainer,
    @Optional() @Self() control: NgControl,
    elementRef: ElementRef<HTMLElement>,
    renderer: Renderer2,
    viewContainerRef: ViewContainerRef,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.container = container;
    this.control = control;
    this.elementRef = elementRef;
    this.renderer = renderer;
    this.errorContainer = new FormErrorContainerDirective(viewContainerRef, componentFactoryResolver);
  }

  ngOnInit(): void {
    this.registerEvents();
  }

  ngDoCheck(): void {
    this.detectChanges();
  }

  ngOnDestroy(): void { }

  private getElement(): HTMLElement {
    const element = this.elementRef.nativeElement;
    if (element.tagName.startsWith('EJS-')) {
      return element.firstChild as HTMLElement;
    }
    return element;
  }

  private onStatusChange(): void {
    const element = this.getElement();
    if (!element) return;

    if (this.target.untouched) {
      this.renderer.removeClass(element, SUCCESS);
      this.renderer.removeClass(element, ERROR);
      this.hideError();
      return;
    }

    const error = this.getNextError();
    if (error) {
      this.renderer.removeClass(element, SUCCESS);
      this.renderer.addClass(element, ERROR);
      const message = getErrorMessage(this.container, this.path, error);
      this.showError(message);
    } else {
      this.renderer.removeClass(element, ERROR);
      this.target.enabled
        ? this.renderer.addClass(element, SUCCESS)
        : this.renderer.removeClass(element, SUCCESS);
      this.hideError();
    }
  }

  private registerEvents(): void {
    this.statusChange
      .pipe(untilDestroyed(this))
      .subscribe(this.onStatusChange.bind(this));

    const controls = this.getControls();
    const events: Observable<unknown>[] = [];
    for (const control of controls) {
      events.push(control.statusChanges);
      events.push(control.valueChanges);
    }
    merge(...events)
      .pipe(untilDestroyed(this))
      .subscribe(this.statusChange);
  }

  private detectChanges(): void {
    let changed = false;
    if (this.valid !== this.target.valid) {
      this.valid = this.target.valid;
      changed = true;
    }
    if (this.touched !== this.target.touched) {
      this.touched = this.target.touched;
      changed = true;
    }
    if (changed) {
      this.statusChange.next();
    }
  }

  private getNextError(): FormError | null {
    const controls = this.getControls();
    for (let index = 0; index < controls.length; index++) {
      const control = controls[index];
      if (!control.errors) continue;
      if (index === 0) {
        const errorCode = Object.keys(control.errors)[0];
        const errorInfo = parseErrorInfo(errorCode);
        if (errorInfo) continue;
        const errorData = control.errors[errorCode];
        return { code: errorCode, data: errorData };
      } else {
        const errorCodes = Object.keys(control.errors);
        for (const errorCode of errorCodes) {
          const errorInfo = parseErrorInfo(errorCode);
          if (!errorInfo) continue;
          const path = errorInfo.getPath();
          if (!path.isPath(this.path)) continue;
          return { code: errorInfo.getName(), data: control.errors[errorCode] };
        }
      }
    }
    return null;
  }

  private getControls(): AbstractControl[] {
    const controls: AbstractControl[] = [];
    let control = this.control
      ? this.control.control
      : this.container.control;
    while (control) {
      controls.push(control);
      control = control.parent;
    }
    return controls;
  }

  private showError(message: string): void {
    if (!this.errorControl) {
      this.errorControl = this.errorContainer.add();
    }
    this.errorControl.message = message;
  }

  private hideError(): void {
    if (this.errorControl) {
      this.errorContainer.remove(this.errorControl);
      this.errorControl = undefined;
    }
  }

}
