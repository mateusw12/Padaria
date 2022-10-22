import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonAppModule,
  DropDownListModule,
  FormGridModule,
  ModalModule,
  MultiSelectModule,
  NumericTextBoxModule,
  TextBoxModule,
} from '@module/shared';
import { ReactiveFormsModule } from '@module/utils/forms';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { BrandComponent } from './brand/brand.component';
import { ClassificationComponent } from './classification/classification.component';
import { ProductComponent } from './product/product.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { UnitMeasureComponent } from './unit-measure/unit-measure.component';

@NgModule({
  declarations: [
    BrandComponent,
    UnitMeasureComponent,
    ProductsComponent,
    ClassificationComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    TextBoxModule,
    FormGridModule,
    ModalModule,
    ReactiveFormsModule,
    TabModule,
    ButtonModule,
    DropDownListModule,
    NumericTextBoxModule,
    ButtonAppModule,
    MultiSelectModule,
    ProductsRoutingModule,
  ],
})
export class ProductsModule {}
