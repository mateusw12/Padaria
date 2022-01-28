import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'menu', loadChildren: () => import('./module/shared/menu/menu.module')
  .then(m => m.MenuModule) },
  { path: 'user', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
