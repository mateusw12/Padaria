import { InvalidOperationException } from "../internal";

export function throwIfAlreadyLoaded(parentModule: object, moduleName: string): void {
  if (parentModule) {
    throw new InvalidOperationException(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
  }
}
