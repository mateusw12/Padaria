import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '@module/routes/src/routes';

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
