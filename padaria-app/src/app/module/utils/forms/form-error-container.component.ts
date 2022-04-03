import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormErrorComponent, FormErrorControl } from './form-error.component';

export interface FormErrorContainer {
  add(): FormErrorControl;
  remove(control: FormErrorControl): void;
}

@Component({
  selector: 'form-error-container',
  template: '<ng-container #container></ng-container>'
})
export class FormErrorContainerComponent implements FormErrorContainer {

  @ViewChild('container', { read: ViewContainerRef, static: true })
  private container!: ViewContainerRef;
  private errorControlFactory: ComponentFactory<FormErrorControl> | undefined;
  private controls: ComponentRef<FormErrorControl>[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  add(): FormErrorControl {
    const control = this.createErrorControl();
    this.controls.push(control);
    return control.instance;
  }

  remove(control: FormErrorControl): void {
    const index = this.controls.findIndex(item => item.instance === control);
    if (index === -1) return;
    const errors = this.controls.splice(index, 1);
    errors[0].destroy();
  }

  private getErrorControlFactory(): ComponentFactory<FormErrorControl> {
    if (!this.errorControlFactory) {
      this.errorControlFactory = this.componentFactoryResolver.resolveComponentFactory(FormErrorComponent);
    }
    return this.errorControlFactory;
  }

  private createErrorControl(): ComponentRef<FormErrorControl> {
    return this.container.createComponent(this.getErrorControlFactory());
  }

}
