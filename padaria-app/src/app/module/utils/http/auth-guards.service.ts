import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthGuardsService implements CanActivate, CanActivateChild {

  constructor(
    private authenticationService: AuthenticationService,
    private routes: Router
  ){}
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = this.authenticationService.getToken();
    if (token) {
      return true;
    }
    this.routes.navigate(['login']);
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = this.authenticationService.getToken();
    if (token) {
      return true;
    }
    this.routes.navigate(['login']);
    return false;
  }

}
