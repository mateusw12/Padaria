import { Component, OnInit } from '@angular/core';
import {
  AppRoutes,
  DASHBOARDS_ROUTES_PATH,
  INFORMATION_PATH,
  LICENSE_PATH,
  OHTERS_ROUTES_PATHS,
  QUERY_ROUTES_PATHS,
  REGISTRATION_ROUTES_PATHS,
} from '@module/routes';
import { DARK_THEME } from '@module/utils/constant';
import { ThemeService } from '@module/utils/services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  get breadCrumb(): AppRoutes | undefined {
    return this._breadCrumb;
  }

  readonly registration_routes: AppRoutes[] = REGISTRATION_ROUTES_PATHS;
  readonly query_routes: AppRoutes[] = QUERY_ROUTES_PATHS;
  readonly dashboards_routes: AppRoutes[] = DASHBOARDS_ROUTES_PATH;
  readonly others_routes: AppRoutes[] = OHTERS_ROUTES_PATHS;
  readonly information_route: AppRoutes = INFORMATION_PATH;
  readonly license_route: AppRoutes = LICENSE_PATH;

  private _breadCrumb: AppRoutes | undefined;
  isLoad = false;

  ngOnInit(): void {
    this.getTheme();
    this.getAllRoutes();
  }

  onBreadCrumb(route: AppRoutes): void {
    this._breadCrumb = route;
    this.isLoad = true;
  }

  getAllRoutes(): void {
    const allRoutes = [];

    for (const item of this.registration_routes) {
      allRoutes.push(item);
    }

    for (const item of this.query_routes) {
      allRoutes.push(item);
    }

    for (const item of this.dashboards_routes) {
      allRoutes.push(item);
    }

    for (const item of this.others_routes) {
      allRoutes.push(item);
    }

    this.getBreadCrump(allRoutes);
  }

  setTheme(): void {
    const globalTheme = this.themeService.getTheme('theme');
    const theme = globalTheme ? globalTheme : DARK_THEME;
    this.themeService.setTheme('theme', theme);
  }

  private getTheme(): void {
    const globalTheme = this.themeService.getTheme('theme');
    const theme = globalTheme ? globalTheme : DARK_THEME;
    this.themeService.setTheme('theme', theme);
  }

  private getBreadCrump(allRoutes: AppRoutes[]): void {
    const url = document.URL.split('menu/');
    const path = url[1];
    const route = allRoutes.find((el) => el.onlyPath === path);
    this._breadCrumb = route;
    this.isLoad = true;
  }
}
