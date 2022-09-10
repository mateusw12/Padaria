import { Component, OnInit } from '@angular/core';
import {
  AppRoutes,
  DASHBOARDS_ROUTES_PATH,
  QUERY_ROUTES_PATHS,
  REGISTRATION_ROUTES_PATHS,
} from '@module/routes';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  readonly registration_routes: AppRoutes[] = REGISTRATION_ROUTES_PATHS;
  readonly query_routes: AppRoutes[] = QUERY_ROUTES_PATHS;
  readonly dashboards_routes: AppRoutes[] = DASHBOARDS_ROUTES_PATH;

  ngOnInit(): void {}

}
