import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsQueryComponent } from './products-query.component';

const routes: Routes = [{ path: '', component: ProductsQueryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsQueryRoutingModule { }
