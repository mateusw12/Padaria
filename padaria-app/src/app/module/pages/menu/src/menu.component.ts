import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AppRoutes,
  INFORMATION_PATH,
  LICENSE_PATH,
  LOGIN_PATH,
  OHTERS_ROUTES_PATHS,
  QUERY_ROUTES_PATHS,
  REGISTRATION_ROUTES_PATHS
} from '@module/routes';
import { DARK_THEME } from '@module/utils/constant';
import { AuthenticationService, ThemeService } from '@module/utils/services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(
    private themeService: ThemeService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  get breadCrumb(): AppRoutes | undefined {
    return this._breadCrumb;
  }

  readonly registration_routes: AppRoutes[] = REGISTRATION_ROUTES_PATHS;
  readonly query_routes: AppRoutes[] = QUERY_ROUTES_PATHS;
  readonly others_routes: AppRoutes[] = OHTERS_ROUTES_PATHS;
  readonly information_route: AppRoutes = INFORMATION_PATH;
  readonly license_route: AppRoutes = LICENSE_PATH;
  readonly login_route: AppRoutes = LOGIN_PATH;

  private _breadCrumb: AppRoutes | undefined;

  ngOnInit(): void {
    this.getTheme();
    this.getAllRoutes();
  }

  onBreadCrumb(route: AppRoutes): void {
    this._breadCrumb = route;
  }

  getAllRoutes(): void {
    const allRoutes = [];

    for (const item of this.registration_routes) {
      allRoutes.push(item);
    }

    for (const item of this.query_routes) {
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

  onLogoutClick(): void {
    this.authenticationService.clearUserToken();
    this.router.navigate([`/${this.login_route.path}`]);
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
  }
}
