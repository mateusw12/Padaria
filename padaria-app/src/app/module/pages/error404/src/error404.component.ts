import { Component } from '@angular/core';
import { AppRoutes, ERROR_404_PATH } from '@module/routes';

@Component({
  templateUrl: './error404.component.html',
})
export class Error404Component {
  readonly error404_routes: AppRoutes = ERROR_404_PATH;
}
