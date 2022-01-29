import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManufacturersComponent } from './manufacturers.component';

const routes: Routes = [{ path: '', component: ManufacturersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufacturersRoutingModule { }
