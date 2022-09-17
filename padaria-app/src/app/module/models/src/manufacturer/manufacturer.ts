export class Manufacturer {
  id: number = 0;
  name: string = '';

  get displayName(): string {
    return `${this.name} (${this.id})`;
  }

}
