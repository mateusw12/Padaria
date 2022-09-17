export class Departament {
  id: number = 0;
  name: string = '';

  get displayName(): string {
    return `${this.name} (${this.id})`;
  }
}
