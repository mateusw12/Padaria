import { untilDestroyed, untilDestroyedAsync } from '@module/utils/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingRepository, UserRepository } from '@module/repository';
import {
  ADMINISTRATOR_ROUTES_PATHS,
  AppRoutes,
  INFORMATION_PATH,
  LICENSE_PATH,
  LOGIN_PATH,
  OHTERS_ROUTES_PATHS,
  QUERY_ROUTES_PATHS,
  REGISTRATION_ROUTES_PATHS,
  SETTINGS_ROUTES_PATHS,
} from '@module/routes';
import { DARK_THEME } from '@module/utils/constant';
import {
  AuthenticationService,
  ErrorHandler,
  ThemeService,
} from '@module/utils/services';
import { User } from '@module/models';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  constructor(
    private themeService: ThemeService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private settingRepository: SettingRepository,
    private errorHandler: ErrorHandler,
    private userRepository: UserRepository
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
  readonly settings_route: AppRoutes = SETTINGS_ROUTES_PATHS;
  readonly administrator_routes: AppRoutes[] = ADMINISTRATOR_ROUTES_PATHS;

  companyTitle: string = '';
  themeColor: string = '';
  logo: string = '';

  private _breadCrumb: AppRoutes | undefined;

  ngOnInit(): void {
    this.getTheme();
    this.getAllRoutes();
    this.loadData();
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

  ngOnDestroy(): void {}

  private loadData(): void {
    this.settingRepository
      .find()
      .pipe(untilDestroyed(this))
      .subscribe(
        (settings) => {
          this.companyTitle = settings.name;
          this.logo = settings.logo;
          this.themeColor = settings.themeColor;
        },
        (error) => this.handleError(error)
      );
  }

  private async getTheme(): Promise<void> {
    try {
      const user = await this.findMe();
      const theme = user.isDarkMode ? DARK_THEME : '';
      this.themeService.setTheme('theme', theme);
    } catch (error) {
      this.handleError(error);
    }
  }

  private getBreadCrump(allRoutes: AppRoutes[]): void {
    const url = document.URL.split('menu/');
    const path = url[1];
    const route = allRoutes.find((el) => el.onlyPath === path);
    this._breadCrumb = route;
  }

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }

  private async findMe(): Promise<User> {
    return await untilDestroyedAsync(this.userRepository.findMe(), this);
  }
}
