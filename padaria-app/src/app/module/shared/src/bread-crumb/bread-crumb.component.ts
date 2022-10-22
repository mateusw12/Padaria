import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { BreadCrumb } from './breadcrumb-interface';

@Component({
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./brad-crumb.component.scss'],
  selector: 'app-bread-crumb',
})
export class BreadCrumbComponent implements OnInit {

  get breadcrumbs(): BreadCrumb[] {
    return this._breadcrumbs;
  }

  private _breadcrumbs: BreadCrumb[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this._breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  ngOnInit() {
    this.getActiveRoute();
  }

  private getActiveRoute(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this._breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
      });
  }

  private buildBreadCrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadCrumb[] = []
  ): BreadCrumb[] {
    let label =
      route.routeConfig && route.routeConfig.data
        ? route.routeConfig.data.breadcrumb
        : '';
    let path =
      route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    const lastRoutePart = path!.split('/').pop();
    if (lastRoutePart) {
      const isDynamicRoute = lastRoutePart.startsWith(':');
      if (isDynamicRoute && !!route.snapshot) {
        const paramName = lastRoutePart.split(':')[1];
        path = path!.replace(lastRoutePart, route.snapshot.params[paramName]);
        label = route.snapshot.params[paramName];
      }
    }

    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: BreadCrumb = {
      label: label,
      url: nextUrl,
    };
    const newBreadcrumbs = breadcrumb.label
      ? [...breadcrumbs, breadcrumb]
      : [...breadcrumbs];
    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
