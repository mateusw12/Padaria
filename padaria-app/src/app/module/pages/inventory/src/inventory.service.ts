import { Injectable } from '@angular/core';
import { Employee, Product, Supplier } from '@module/models';
import {
  EmployeeRepository,
  ProductRepository,
  SupplierRepository,
} from '@module/repository';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private _products: Product[] = [];
  private _suppliers: Supplier[] = [];
  private _employees: Employee[] = [];

  constructor(
    private productRepository: ProductRepository,
    private employeeRepository: EmployeeRepository,
    private supplierRepository: SupplierRepository
  ) {}

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

  loadEmployees(): Observable<Employee[]> {
    if (this._employees.length > 0) {
      return of(this._employees);
    }
    return this.employeeRepository.findAll().pipe(
      tap((employees) => {
        this._employees = employees;
        return this._employees;
      })
    );
  }

  loadSuppliers(): Observable<Supplier[]> {
    if (this._suppliers.length > 0) {
      return of(this._suppliers);
    }
    return this.supplierRepository.findAll().pipe(
      tap((suppliers) => {
        this._suppliers = suppliers;
        return this._suppliers;
      })
    );
  }
}
