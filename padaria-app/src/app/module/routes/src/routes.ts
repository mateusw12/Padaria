import { Routes } from '@angular/router';
import { MenuComponent } from '@module/pages/menu';
import * as pages from './pages';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'menu/home' },
  {
    path: 'menu',
    component: MenuComponent,
    data: { pageTitle: 'Menu' },
    children: [
      {
        path: 'home',
        data: { pageTitle: 'Home' },
        loadChildren: pages.homeRegistration,
      },
      {
        path: 'registrations',
        data: { pageTitle: 'Cadastros' },
        children: [
          {
            path: 'jobs',
            data: { pageTitle: 'Cargos' },
            loadChildren: pages.jobRegistration,
          },
          {
            path: 'departaments',
            data: { pageTitle: 'Departamentos' },
            loadChildren: pages.departamentRegistration,
          },
          {
            path: 'products',
            data: { pageTitle: 'Produtos' },
            loadChildren: pages.productRegistration,
          },
          {
            path: 'employees',
            data: { pageTitle: 'Funcionários' },
            loadChildren: pages.employeeRegistration,
          },
          {
            path: 'suppliers',
            data: { pageTitle: 'Fornecedores' },
            loadChildren: pages.supplierRegistration,
          },
          {
            path: 'note-types',
            data: { pageTitle: 'Tipos de Nota' },
            loadChildren: pages.noteTypeRegistration,
          },
          {
            path: 'manufacturers',
            data: { pageTitle: 'Fabricantes' },
            loadChildren: pages.manufacturerRegistration,
          },
        ],
      },
      {
        path: 'queries',
        data: { pageTitle: 'Consultas' },
        children: [
          {
            path: 'employee-query',
            data: { pageTitle: 'Funcionários' },
            loadChildren: pages.employeeQueryRegistration,
          },
          {
            path: 'products-query',
            data: { pageTitle: 'Produtos' },
            loadChildren: pages.productQueryRegistration,
          },
        ],
      },
      {
        path: 'inventory',
        data: { pageTitle: 'Estoque' },
        loadChildren: pages.inventoryRegistration,
      },
      {
        path: 'information',
        data: { pageTitle: 'Sobre' },
        loadChildren: pages.informationRegistration,
      },
      {
        path: 'license',
        data: { pageTitle: 'Licenças' },
        loadChildren: pages.licenseRegistration,
      },
      {
        path: 'purchase-control',
        data: { pageTitle: 'Controle Compras' },
        loadChildren: pages.purchaseControlRegistration,
      },
    ],
  },
];
