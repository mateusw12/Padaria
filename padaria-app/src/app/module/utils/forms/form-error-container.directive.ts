import { ComponentFactoryResolver, ComponentRef, Directive, ViewContainerRef } from '@angular/core';
import { FormErrorContainer, FormErrorContainerComponent } from './form-error-container.component';
import { FormErrorControl } from './form-error.component';

@Directive({
  selector: '[formErrorContainer]',
  exportAs: 'formErrorContainer'
})
export class FormErrorContainerDirective implements FormErrorContainer {

  private errorContainer: ComponentRef<FormErrorContainerComponent> | undefined;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  add(): FormErrorControl {
    return this.getErrorContainer().add();
  }

  remove(control: FormErrorControl): void {
    this.getErrorContainer().remove(control);
  }

  private getErrorContainer(): FormErrorContainerComponent {
    if (!this.errorContainer) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormErrorContainerComponent);
      this.errorContainer = this.viewContainerRef.createComponent(componentFactory);
      this.errorContainer.changeDetectorRef.detectChanges();
    }
    return this.errorContainer.instance;
  }

}
