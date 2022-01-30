import { OperatorFunction } from 'rxjs';
import { Class } from '../internal/interfaces';


 export declare function mapArray<T>(type: Class<T>): OperatorFunction<object, T[]>;

