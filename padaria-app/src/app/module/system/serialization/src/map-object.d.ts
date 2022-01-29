import { Class } from '../../src';
import { OperatorFunction } from 'rxjs';

export declare function mapObject<T>(
  type: Class<T>
): OperatorFunction<object, T>;
