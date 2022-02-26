import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuSideBarNode, MenuSideBar } from '@module/models';
import {
  SidebarComponent,
  TreeViewComponent,
} from '@syncfusion/ej2-angular-navigations';

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
const inventory = 'Estoque';
const buy = 'Compras';
const sales = 'Vendas';
const chart = 'Gráfico';

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
  pageName: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  async onClick(data: SideBarData): Promise<void> {
    const id = data.nodeData.id;
    switch (id) {
      case '02':
        this.pageName = `${registration} / Departamento`;
        this.router.navigateByUrl('menu/departaments');
        break;
      case '03':
        this.pageName = `${registration} / Forncedor`;
        this.router.navigateByUrl('menu/suppliers');
        break;
      case '04':
        this.pageName = `${registration} / Funcionário`;
        this.router.navigateByUrl('menu/employee');
        break;
      case '05':
        this.pageName = `${registration} / Fabricante`;
        this.router.navigateByUrl('menu/manufacturers');
        break;
      case '06':
        this.pageName = `${registration} / Produto`;
        this.router.navigateByUrl('menu/products');
        break;
      case '07':
        this.pageName = `${registration} / Função`;
        this.router.navigateByUrl('menu/jobs');
        break;
      case '08':
        this.pageName = `${registration} / Tipo Notal`;
        this.router.navigateByUrl('menu/note-type');
        break;
      default:
        break;
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
