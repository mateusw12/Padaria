import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonAppModule,
  FormGridModule,
  ModalModule,
  MultiSelectModule,
  TextBoxModule,
} from '@module/shared/src';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ProductsQueryRoutingModule } from './products-query-routing.module';
import { ProductsQueryComponent } from './products-query.component';
import { SearchModalomponent } from './search-modal/search-modal.component';

@NgModule({
  declarations: [ProductsQueryComponent, SearchModalomponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextBoxModule,
    MultiSelectModule,
    ModalModule,
    ButtonModule,
    ButtonAppModule,
    FormGridModule,
    ProductsQueryRoutingModule,
  ],
})
export class ProductsQueryModule {}
