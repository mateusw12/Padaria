import { OperatorFunction } from 'rxjs';
import { Class } from '../../src';

export declare function mapArray<T>(
  type: Class<T>
): OperatorFunction<object, T[]>;
