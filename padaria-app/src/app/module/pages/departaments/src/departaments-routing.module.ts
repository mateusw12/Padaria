import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartamentsComponent } from './departaments.component';

const routes: Routes = [{ path: '', component: DepartamentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartamentsRoutingModule { }
