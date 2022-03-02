import { NgModule } from '@angular/core';
import { ReactiveFormsModule as AngularReactiveFormsModule } from '@angular/forms';
import { FormErrorContainerComponent } from './form-error-container.component';
import { FormErrorContainerDirective } from './form-error-container.directive';
import { FormErrorHandlerDirective } from './form-error-handler.directive';
import { FormErrorComponent } from './form-error.component';

@NgModule({
  imports: [
    AngularReactiveFormsModule
  ],
  entryComponents: [
    FormErrorComponent,
    FormErrorContainerComponent
  ],
  declarations: [
    FormErrorComponent,
    FormErrorContainerComponent,
    FormErrorContainerDirective,
    FormErrorHandlerDirective
  ],
  exports: [
    AngularReactiveFormsModule,
    FormErrorComponent,
    FormErrorContainerComponent,
    FormErrorContainerDirective,
    FormErrorHandlerDirective
  ]
})
export class ReactiveFormsModule { }
