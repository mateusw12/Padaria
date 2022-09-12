import { InjectionToken } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationExtras } from '@angular/router';

export interface NavigationProvider {

  getReturnUrl(route: ActivatedRouteSnapshot): string | undefined;

  navigateTo(commands: unknown[], extras?: NavigationExtras): Promise<boolean>;

  navigateToLogin(returnUrl?: string): Promise<boolean>;

  navigateToHome(returnUrl?: string): Promise<boolean>;

  navigateToProfile(): Promise<boolean>;

  navigateToError400(): Promise<boolean>;

  navigateToError401(): Promise<boolean>;

  navigateToError403(): Promise<boolean>;

  navigateToError404(): Promise<boolean>;

  navigateToError500(): Promise<boolean>;

}

export const NAVIGATION_PROVIDER = new InjectionToken<NavigationProvider>('NAVIGATION_PROVIDER');
