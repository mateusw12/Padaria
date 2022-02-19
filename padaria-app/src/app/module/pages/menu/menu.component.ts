import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  SidebarComponent,
  TreeViewComponent,
} from '@syncfusion/ej2-angular-navigations';
import { MenuSideBar, MenuSideBarNode } from '../../models';

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

const registration = 'Cadastro';
const query = 'Consulta';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
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
  pageName: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  async onClick(data: SideBarData): Promise<void> {
    const id = data.nodeData.id;
    if (id === '02') {
      this.pageName = `${registration} / Departamento`;
      this.router.navigateByUrl('menu/departaments');
    }
    if (id === '03') {
      this.pageName = `${registration} / Forncedor`;
      this.router.navigateByUrl('menu/suppliers');
    }
    if (id === '04') {
      this.pageName = `${registration} / Funcionário`;
      this.router.navigateByUrl('menu/employee');
    }
    if (id === '05') {
      this.pageName = `${registration} / Fabricante`;
      this.router.navigateByUrl('menu/manufacturers');
    }
    if (id === '06') {
      this.pageName = `${registration} / Produto`;
      this.router.navigateByUrl('menu/products');
    }
    if (id === '07') {
      this.pageName = `${registration} / Função`;
      this.router.navigateByUrl('menu/jobs');
    }
  }

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
}
