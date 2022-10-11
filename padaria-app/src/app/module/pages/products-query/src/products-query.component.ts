import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  Brand,
  Classification,
  Manufacturer,
  Product,
  ProductQueryFilter,
  UnitMeasure,
} from '@module/models';
import {
  BrandRepository,
  ClassificationRepository,
  ManufacturerRepository,
  ProductQueryRepository,
  ProductRepository,
  UnitMeasureRepository,
} from '@module/repository';
import { SfGridColumnModel, SfGridColumns } from '@module/shared/src/grid';
import { untilDestroyed } from '@module/utils/common';
import { ErrorHandler } from '@module/utils/services';
import { forkJoin } from 'rxjs';
import { SearchModalomponent } from './search-modal/search-modal.component';

interface GridRow {
  id: number;
  productName: string;
  classificationName: string;
  unitMeasureName: string;
  brandName: string;
  manufacturerName: string;
  unitaryPrice: number;
  amount: number;
}

@Component({
  selector: 'app-products-query',
  templateUrl: './products-query.component.html',
})
export class ProductsQueryComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  manufacturers: Manufacturer[] = [];
  brands: Brand[] = [];
  unitMeasures: UnitMeasure[] = [];
  classifications: Classification[] = [];

  dataSource: GridRow[] = [];
  columns: SfGridColumnModel[] = this.createColumns();

  @ViewChild(SearchModalomponent, { static: false })
  private searchModal!: SearchModalomponent;

  constructor(
    private errorHandler: ErrorHandler,
    private manufacturerRepository: ManufacturerRepository,
    private brandRepository: BrandRepository,
    private classificationRepository: ClassificationRepository,
    private unitMeasureRepository: UnitMeasureRepository,
    private productQueryRepository: ProductQueryRepository,
    private productRepository: ProductRepository
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async onSearchClick(): Promise<void> {
    this.searchModal.onOpen();
  }

  onFiltered(filter?: ProductQueryFilter): void {
    this.loadData(filter);
  }

  ngOnDestroy(): void {}

  private loadData(filter?: ProductQueryFilter): void {
    forkJoin([
      this.productQueryRepository.find(filter),
      this.productRepository.findAll(),
      this.manufacturerRepository.findAll(),
      this.brandRepository.findAll(),
      this.classificationRepository.findAll(),
      this.unitMeasureRepository.findAll(),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(
        ([
          productsFilter,
          products,
          manufactures,
          brands,
          classifications,
          unitMeasures,
        ]) => {
          this.products = products;
          this.manufacturers = manufactures;
          this.brands = brands;
          this.classifications = classifications;
          this.unitMeasures = unitMeasures;

          const dataSource: GridRow[] = [];

          for (const item of productsFilter) {
            const manufacturer = manufactures.find(
              (el) => el.id === item.manufacturerId
            );
            const brand = brands.find((el) => el.id === item.brandId);
            const classification = classifications.find(
              (el) => el.id === item.classificationId
            );
            const unitMeasure = unitMeasures.find(
              (el) => el.id === item.unitMeasureId
            );

            dataSource.push({
              amount: item.amount,
              brandName: brand ? brand.displayName : '',
              classificationName: classification
                ? classification.displayName
                : '',
              id: item.productId,
              manufacturerName: manufacturer ? manufacturer.displayName : '',
              productName: item.productName,
              unitaryPrice: item.unitMeasureId,
              unitMeasureName: unitMeasure ? unitMeasure.displayName : '',
            });
          }

          this.dataSource = dataSource;
        },
        (error) => this.handleError(error)
      );
  }

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }

  private createColumns(): SfGridColumnModel[] {
    return SfGridColumns.build<GridRow>({
      id: SfGridColumns.numeric('id', 'Código')
        .minWidth(100)
        .identity()
        .isPrimaryKey(true),
      productName: SfGridColumns.text('productName', 'Produto').minWidth(200),
      classificationName: SfGridColumns.text(
        'classificationName',
        'Classificação'
      ).minWidth(200),
      brandName: SfGridColumns.text('brandName', 'Marca').minWidth(200),
      manufacturerName: SfGridColumns.text(
        'manufacturerName',
        'Fabricante'
      ).minWidth(200),
      unitMeasureName: SfGridColumns.text(
        'unitMeasureName',
        'Unidade de Medida'
      ).minWidth(200),
      unitaryPrice: SfGridColumns.numeric(
        'unitaryPrice',
        'Preço Unitário'
      ).minWidth(200),
      amount: SfGridColumns.numeric('amount', 'Quantidade').minWidth(100),
    });
  }
}
