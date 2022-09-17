export class NoteType {
  id: number = 0;
  name: string = '';
  abbreviation: string = '';

  get displayName(): string {
    return `${this.name} (${this.id})`;
  }
}
