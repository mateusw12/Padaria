import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseControlComponent } from './purchase-control.component';

const routes: Routes = [{ path: '', component: PurchaseControlComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseControlRoutingModule {}
