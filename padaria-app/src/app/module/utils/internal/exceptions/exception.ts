export class Exception extends Error {

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, Exception.prototype);
    this.name = 'Exception';
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }

}
