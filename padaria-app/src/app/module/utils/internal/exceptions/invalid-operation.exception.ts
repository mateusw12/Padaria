import { Exception } from './exception';

export class InvalidOperationException extends Exception {

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidOperationException.prototype);
    this.name = 'InvalidOperationException';
  }

}
