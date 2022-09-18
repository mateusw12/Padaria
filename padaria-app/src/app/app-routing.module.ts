import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from '@module/pages/menu';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'menu' },
  {
    path: 'menu',
    component: MenuComponent,
    children: [
      {
        path: 'jobs',
        loadChildren: () =>
          import('./module/pages/jobs').then((m) => m.JobsModule),
      },
      {
        path: 'departaments',
        loadChildren: () =>
          import('./module/pages/departaments').then(
            (m) => m.DepartamentsModule
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./module/pages/products').then((m) => m.ProductsModule),
      },
      {
        path: 'employee',
        loadChildren: () =>
          import('./module/pages/employees').then((m) => m.EmployeesModule),
      },

      {
        path: 'suppliers',
        loadChildren: () =>
          import('./module/pages/suppliers').then((m) => m.SuppliersModule),
      },
      {
        path: 'note-type',
        loadChildren: () =>
          import('./module/pages/note-types').then((m) => m.NoteTypesModule),
      },
      {
        path: 'manufacturers',
        loadChildren: () =>
          import('./module/pages/manufacturers').then(
            (m) => m.ManufacturersModule
          ),
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
      {
        path: 'purchase',
        loadChildren: () =>
          import('./module/pages/inventory').then((m) => m.InventoryModule),
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('./module/pages/inventory').then((m) => m.InventoryModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
