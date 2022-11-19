import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Error404RoutingModule } from './error404-routing.module';
import { Error404Component } from './error404.component';

@NgModule({
  imports: [CommonModule, Error404RoutingModule],
  declarations: [Error404Component],
})
export class Error404Module {}
