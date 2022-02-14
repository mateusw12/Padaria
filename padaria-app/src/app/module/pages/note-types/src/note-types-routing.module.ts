import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteTypesComponent } from './note-types.component';

const routes: Routes = [{ path: '', component: NoteTypesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteTypesRoutingModule { }
