import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsQueryRoutingModule } from './products-query-routing.module';
import { ProductsQueryComponent } from './products-query.component';


@NgModule({
  declarations: [
    ProductsQueryComponent
  ],
  imports: [
    CommonModule,
    ProductsQueryRoutingModule
  ]
})
export class ProductsQueryModule { }
