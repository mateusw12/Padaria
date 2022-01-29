import { Observable, Subscribable } from 'rxjs';

/**
 * implementa o subscribe se cancelável
 * @param instance
 * @param destroyMethodName
 */
export declare function untiDestroyed(
  instance: object,
  destroyMethodName?: string
): <T>(source: Observable<T>) => Observable<T>;

/**
 * @param subscribale
 * @param instance
 * @param destroyMethodName
 */
export declare function untilDestroyedAsync<T>(
  subscribale: Subscribable<T>,
  instance: object,
  destroyMethodName?: string
): Promise<T>;
