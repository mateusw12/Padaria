import { AfterViewInit, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements AfterViewInit, OnDestroy {
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}
}
