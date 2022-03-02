import { Injectable, OnDestroy, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExternalNavigationService implements OnInit, OnDestroy {

  ngOnInit(): void {}

  goToUrl(url: string | null): void {
    if (!url) return;
    if (url.startsWith('www')) window.open(`https://${url}`, '_blank');
    window.open(`${url}`, '_blank');
  }

  ngOnDestroy(): void {}
}
