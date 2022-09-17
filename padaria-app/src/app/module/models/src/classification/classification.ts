export class Classification {
  id: number = 0;
  name: string = '';
  productIds: number[] = [];

  get displayName(): string {
    return `${this.name} (${this.id})`;
  }
}
