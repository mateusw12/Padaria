export class Product {
  id: number = 0;
  name: string = '';
  description: string = '';
  groupedCodes: string = '';
  brandId: number = 0;
  unitaryPrice: number = 0;
  amount: number = 0;
  unitMeasureId: number = 0;
  manufacturerId: number = 0;

  get displayName(): string {
    return `${this.name} (${this.id})`;
  }
}
