import { Injectable } from '@angular/core';
import { Brand, Product } from '@module/models';
import { BrandRepository, ProductRepository } from '@module/repository';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class SalesControlService {
  private _products: Product[] = [];
  private _brands: Brand[] = [];

  constructor(
    private productRepository: ProductRepository,
    private brandRepository: BrandRepository
  ) {}

  findProductByBarCode(barCode: string): Observable<Product> {
    return this.productRepository.findByBarCode(barCode).pipe(
      tap((products) => {
        return products;
      })
    );
  }

  loadProducts(): Observable<Product[]> {
    if (this._products.length > 0) {
      return of(this._products);
    }
    return this.productRepository.findAll().pipe(
      tap((products) => {
        this._products = products;
        return this._products;
      })
    );
  }

  loadBrands(): Observable<Brand[]> {
    if (this._brands.length > 0) {
      return of(this._brands);
    }
    return this.brandRepository.findAll().pipe(
      tap((brands) => {
        this._brands = brands;
        return this._brands;
      })
    );
  }
}
