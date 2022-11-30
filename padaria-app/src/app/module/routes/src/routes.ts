import { Routes } from '@angular/router';
import { MenuComponent } from '@module/pages/menu';
import { AuthGuardsService } from '@module/utils/http';
import * as pages from './pages';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    data: { pageTitle: 'Login' },
    loadChildren: pages.loginRegistration,
  },
  {
    path: 'menu',
    component: MenuComponent,
    data: { pageTitle: 'Menu', breadcrumb: 'Menu' },
    canActivate: [AuthGuardsService],
    canActivateChild: [AuthGuardsService],
    children: [
      {
        path: 'home',
        data: { pageTitle: 'Home', breadcrumb: 'Home' },
        loadChildren: pages.homeRegistration,
      },
      {
        path: 'registrations',
        data: { pageTitle: 'Cadastros', breadcrumb: 'Cadastros' },
        children: [
          {
            path: 'jobs',
            data: { pageTitle: 'Cargos', breadcrumb: 'Cargos' },
            loadChildren: pages.jobRegistration,
          },
          {
            path: 'departaments',
            data: { pageTitle: 'Departamentos', breadcrumb: 'Departamentos' },
            loadChildren: pages.departamentRegistration,
          },
          {
            path: 'products',
            data: { pageTitle: 'Produtos', breadcrumb: 'Produtos' },
            loadChildren: pages.productRegistration,
          },
          {
            path: 'employees',
            data: { pageTitle: 'Funcionários', breadcrumb: 'Funcionários' },
            loadChildren: pages.employeeRegistration,
          },
          {
            path: 'suppliers',
            data: { pageTitle: 'Fornecedores', breadcrumb: 'Fornecedores' },
            loadChildren: pages.supplierRegistration,
          },
          {
            path: 'note-types',
            data: { pageTitle: 'Tipos de Nota', breadcrumb: 'Tipos de Nota' },
            loadChildren: pages.noteTypeRegistration,
          },
          {
            path: 'manufacturers',
            data: { pageTitle: 'Fabricantes', breadcrumb: 'Fabricantes' },
            loadChildren: pages.manufacturerRegistration,
          },
          {
            path: 'users',
            data: { pageTitle: 'Usuário', breadcrumb: 'Usuário' },
            loadChildren: pages.userRegistration,
          },
        ],
      },
      {
        path: 'queries',
        data: { pageTitle: 'Consultas', breadcrumb: 'Consultas' },
        children: [
          {
            path: 'employee-query',
            data: { pageTitle: 'Funcionários', breadcrumb: 'Funcionários' },
            loadChildren: pages.employeeQueryRegistration,
          },
          {
            path: 'products-query',
            data: { pageTitle: 'Produtos', breadcrumb: 'Produtos' },
            loadChildren: pages.productQueryRegistration,
          },
        ],
      },
      {
        path: 'inventory',
        data: { pageTitle: 'Estoque', breadcrumb: 'Estoque' },
        loadChildren: pages.inventoryRegistration,
      },
      {
        path: 'information',
        data: { pageTitle: 'Sobre', breadcrumb: 'Sobre' },
        loadChildren: pages.informationRegistration,
      },
      {
        path: 'license',
        data: { pageTitle: 'Licenças', breadcrumb: 'Licenças' },
        loadChildren: pages.licenseRegistration,
      },
      {
        path: 'purchase-control',
        data: {
          pageTitle: 'Controle Compras',
          breadcrumb: 'Controle de Compras',
        },
        loadChildren: pages.purchaseControlRegistration,
      },
      {
        path: 'settings',
        data: {
          pageTitle: 'Configuração',
          breadcrumb: 'Configuração',
        },
        loadChildren: pages.settingsRegistration,
      },
      {
        path: 'sales-control',
        data: {
          pageTitle: 'Controle de Vendas',
          breadcrumb: 'Controle de Venda',
        },
        loadChildren: pages.salesControlRegistration,
      },
      {
        path: '**',
        data: { pageTitle: 'Erro 404', BreadCrumb: '' },
        loadChildren: pages.error404Registration,
      },
    ],
  },
];
