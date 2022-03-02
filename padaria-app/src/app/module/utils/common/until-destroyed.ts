import { isFunction } from 'lodash';
import { Observable, Subject, Subscribable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const untilDestroyedSymbol = Symbol('untilDestroyed');

interface UntilDestroyedAccessor {
  [destroyMethodName: string]: () => void;
  [untilDestroyedSymbol]: Subject<void>;
}

function getDestroyedListener(
  instance: object,
  destroyMethodName: string
): Subject<void> {
  const accessor = instance as UntilDestroyedAccessor;
  const originalDestroy = accessor[destroyMethodName];
  if (!isFunction(originalDestroy)) {
    throw new Error(
      `${instance.constructor.name} is using untilDestroyed but doesn't implement ${destroyMethodName}.`
    );
  }

  if (!accessor[untilDestroyedSymbol]) {
    accessor[untilDestroyedSymbol] = new Subject<void>();
    accessor[destroyMethodName] = function () {
      originalDestroy.apply(this, Array.from(arguments));
      accessor[untilDestroyedSymbol].next();
      accessor[untilDestroyedSymbol].complete();
    };
  }

  return accessor[untilDestroyedSymbol];
}

/**
 * Operador RxJS que cancela a assinatura de observáveis no destino.
 * Código bifurcado de https://github.com/NetanelBasal/ngx-take-until-destroy
 *
 * IMPORTANTE: Adicione o operador `untilDestroyed` como o último para evitar vazamentos com observáveis intermediários
 * na cadeia de operadores.
 *
 * Exemplo de uso:
 *
 * ts
 * import { untilDestroyed } from '@movtech/menu/common';
 *
 * @Component({
 * selector: 'app-example',
 *   templateUrl: './example.component.html'
 * })
 * export class ExampleComponent implements OnInit, OnDestroy {
 *   ngOnInit() {
 *     interval(1000)
 *       .pipe(untilDestroyed(this))
 *       .subscribe(val => console.log(val));
 *   }
 *
 *   // Este método deve estar presente, mesmo que vazio.
 *   ngOnDestroy() {
 *     // Para protegê-lo, um erro será gerado se ele não existir.
 *   }
 * }
 *
 *
 * @param instance O componente Angular pai ou a instância do objeto.
 * @param destroyMethodName O método para conectar (padrão: 'ngOnDestroy').
 */
export function untilDestroyed(
  instance: object,
  destroyMethodName: string = 'ngOnDestroy'
) {
  return <T>(source: Observable<T>) => {
    const listener = getDestroyedListener(instance, destroyMethodName);
    return source.pipe(takeUntil<T>(listener));
  };
}

/**
 * Transforma um assinável em uma promessa cancelável.
 *
 * Exemplo de uso:
 *
 * ts
 * import { untilDestroyedAsync } from '@movtech/menu/common';
 * import { tap } from 'rxjs/operators';
 *
 * @Component({
 * selector: 'app-example',
 *   templateUrl: './example.component.html'
 * })
 * export class ExampleComponent implements OnDestroy {
 *   async doSomething() {
 *     await untilDestroyedAsync(
 *       interval(1000).pipe(tap(val => console.log(val)))
 *     );
 *   }
 *
 *   // Este método deve estar presente, mesmo que vazio.
 *   ngOnDestroy() {
 *     // Para protegê-lo, um erro será gerado se ele não existir.
 *   }
 * }
 *
 *
 * @param subscribale O assinável que gerará a promessa cancelável.
 * @param instance O componente Angular pai ou a instância do objeto.
 * @param destroyMethodName O método para conectar (padrão: 'ngOnDestroy').
 */
export function untilDestroyedAsync<T>(
  subscribable: Subscribable<T>,
  instance: object,
  destroyMethodName: string = 'ngOnDestroy'
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const listener = getDestroyedListener(instance, destroyMethodName);
    let value: T;
    const subscription = subscribable.subscribe({
      next: (next) => (value = next),
      error: (error) => reject(error),
      complete: () => {
        if (!value) {
          reject(new Error('Não obteve nenhum resultado.'));
          return;
        }
        resolve(value);
      },
    });
    listener.subscribe(() => subscription.unsubscribe());
  });
}
