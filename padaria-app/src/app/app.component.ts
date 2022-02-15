import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  SidebarComponent,
  TreeViewComponent,
} from '@syncfusion/ej2-angular-navigations';
import { MenuSideBar, MenuSideBarNode } from './module/models';

interface SideBarData {
  nodeData: NodeData;
}

interface NodeData {
  id: string;
  text: string;
  hasChildren: boolean;
}

interface MenuSideBarFiled {
  id: string;
  text: string;
  child: string;
  iconCss: string;
  dataSource: MenuSideBarNode[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'padaria-app';
  @ViewChild('sidebarTreeviewInstance')
  sidebarTreeviewInstance!: SidebarComponent;
  @ViewChild('treeviewInstance')
  treeviewInstance!: TreeViewComponent;

  private menuItems: MenuSideBar = new MenuSideBar();

  field: MenuSideBarFiled = {
    dataSource: this.menuItems.items,
    id: 'nodeId',
    text: 'nodeText',
    child: 'nodeChild',
    iconCss: 'iconCss',
  };
  width: string = '290px';
  enableDock: boolean = true;
  dockSize: string = '44px';
  mediaQuery: string = '(min-width: 600px)';
  target: string = '.main-content';
  departamentsLoad = false;
  employeeLoad = false;
  manufacturerLoad = false;
  jobsLoad = false;
  productsLoad = false;
  suppliersLoad = false;
  noteTypesLoad = false;

  constructor(private router: Router) {}

  async onClick(data: SideBarData): Promise<void> {
    const id = data.nodeData.id;
    if (id === '02') {
      this.employeeLoad = false;
      this.employeeLoad = false;
      this.manufacturerLoad = false;
      this.jobsLoad = false;
      this.productsLoad = false;
      this.noteTypesLoad = false;
      this.departamentsLoad = true;
    }
    if (id === '03') {
      this.employeeLoad = false;
      this.departamentsLoad = false;
      this.employeeLoad = false;
      this.manufacturerLoad = false;
      this.jobsLoad = false;
      this.productsLoad = false;
      this.noteTypesLoad = false;
      this.suppliersLoad = true;
    }
    if (id === '04') {
      this.employeeLoad = false;
      this.departamentsLoad = false;
      this.suppliersLoad = false;
      this.manufacturerLoad = false;
      this.jobsLoad = false;
      this.productsLoad = false;
      this.noteTypesLoad = false;
      this.employeeLoad = true;
    }
    if (id === '05') {
      this.departamentsLoad = false;
      this.employeeLoad = false;
      this.departamentsLoad = false;
      this.suppliersLoad = false;
      this.employeeLoad = false;
      this.jobsLoad = false;
      this.productsLoad = false;
      this.noteTypesLoad = false;
      this.manufacturerLoad = true;
    }
    if (id === '06') {
      this.departamentsLoad = false;
      this.employeeLoad = false;
      this.departamentsLoad = false;
      this.suppliersLoad = false;
      this.employeeLoad = false;
      this.jobsLoad = false;
      this.manufacturerLoad = false;
      this.noteTypesLoad = false;
      this.productsLoad = true;
    }
    if (id === '07') {
      this.departamentsLoad = false;
      this.employeeLoad = false;
      this.departamentsLoad = false;
      this.suppliersLoad = false;
      this.employeeLoad = false;
      this.productsLoad = false;
      this.manufacturerLoad = false;
      this.noteTypesLoad = false;
      this.jobsLoad = true;
    }
    if (id === '08') {
      this.departamentsLoad = false;
      this.employeeLoad = false;
      this.departamentsLoad = false;
      this.suppliersLoad = false;
      this.employeeLoad = false;
      this.productsLoad = false;
      this.manufacturerLoad = false;
      this.jobsLoad = false;
      this.jobsLoad = false;
      this.noteTypesLoad = true;
    }

  }

  ngOnInit(): void {}

  async onCreated(args: any): Promise<void> {
    this.sidebarTreeviewInstance.element.style.visibility = '';
  }

  async onClose(args: any): Promise<void> {
    this.treeviewInstance.collapseAll();
  }

  async openClick(): Promise<void> {
    if (this.sidebarTreeviewInstance.isOpen) {
      this.sidebarTreeviewInstance.hide();
      this.treeviewInstance.collapseAll();
    } else {
      this.sidebarTreeviewInstance.show();
      this.treeviewInstance.expandAll();
    }
  }

  ngOnDestroy(): void {}
}
