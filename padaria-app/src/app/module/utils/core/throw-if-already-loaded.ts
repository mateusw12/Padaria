import { InvalidOperationException } from "../internal";

/**
 * Guarda de importação do módulo.
 *
 * Exemplo de uso:
 *
 * ```ts
 * constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
 *   throwIfAlreadyLoaded(parentModule, 'CoreModule');
 * }
 * ```
 *
 * @param parentModule Módulo pai.
 * @param moduleName Nome do módulo.
 */
export function throwIfAlreadyLoaded(parentModule: object, moduleName: string): void {
  if (parentModule) {
    throw new InvalidOperationException(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
  }
}
