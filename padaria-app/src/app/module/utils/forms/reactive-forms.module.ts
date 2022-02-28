import { NgModule } from '@angular/core';
import { ReactiveFormsModule as AngularReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    AngularReactiveFormsModule,
    MatInputModule
  ],
  exports: [
    AngularReactiveFormsModule,
  ]
})
export class ReactiveFormsModule { }
