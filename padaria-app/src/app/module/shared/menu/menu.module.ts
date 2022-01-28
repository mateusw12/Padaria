import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import {
  ContextMenuModule,
  SidebarModule,
  TreeViewModule
} from '@syncfusion/ej2-angular-navigations';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    ContextMenuModule,
    TreeViewModule,
    SidebarModule,
    GridModule,
    TextBoxModule,
    MenuRoutingModule,
  ],
})
export class MenuModule {}
