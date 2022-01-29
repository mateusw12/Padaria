import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'departaments',
    loadChildren: () =>
      import('./module/pages/departaments').then((m) => m.DepartamentsModule),
  },

  {
    path: 'employee',
    loadChildren: () =>
      import('./module/pages/employees').then((m) => m.EmployeesModule),
  },

  {
    path: 'jobs',
    loadChildren: () => import('./module/pages/jobs').then((m) => m.JobsModule),
  },

  {
    path: 'products',
    loadChildren: () =>
      import('./module/pages/products').then((m) => m.ProductsModule),
  },
  {
    path: 'suppliers',
    loadChildren: () =>
      import('./module/pages/suppliers').then((m) => m.SuppliersModule),
  },

  {
    path: 'manufacturers',
    loadChildren: () =>
      import('./module/pages/manufacturers').then((m) => m.ManufacturersModule),
  },

  {
    path: 'employee-query',
    loadChildren: () =>
      import('./module/pages/employee-query').then(
        (m) => m.EmployeeQueryModule
      ),
  },

  {
    path: 'products-query',
    loadChildren: () =>
      import('./module/pages/products-query').then(
        (m) => m.ProductsQueryModule
      ),
  },

  {
    path: 'inventory',
    loadChildren: () =>
      import('./module/pages/inventory').then((m) => m.InventoryModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
