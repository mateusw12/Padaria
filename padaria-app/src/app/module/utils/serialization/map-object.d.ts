import { OperatorFunction } from 'rxjs';
import { Class } from '../internal/interfaces';

export declare function mapObject<T>(
  type: Class<T>
): OperatorFunction<object, T>;
