import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesControlComponent } from './sales-control.component';

const routes: Routes = [{ path: '', component: SalesControlComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesControlRoutingModule {}
