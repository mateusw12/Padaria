import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { BrandComponent } from './brand/brand.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { UnitMeasureComponent } from './unit-measure/unit-measure.component';

@NgModule({
  declarations: [BrandComponent, UnitMeasureComponent, ProductsComponent],
  imports: [
    CommonModule,
    TextBoxModule,
    GridModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    TabModule,
    ButtonModule,
    ProductsRoutingModule,
  ],
})
export class ProductsModule {}
