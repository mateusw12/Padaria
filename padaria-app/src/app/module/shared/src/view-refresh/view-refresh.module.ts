import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ViewRefreshDirective } from './view-refresh.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ViewRefreshDirective],
  exports: [ViewRefreshDirective]
})
export class ViewRefreshModule { }
